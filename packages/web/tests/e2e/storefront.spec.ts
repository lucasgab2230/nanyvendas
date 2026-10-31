import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { SELECTION_STORAGE_KEY } from "../../src/web/lib/selection";

const cards = ".product-card";

test("abre a vitrine, carrega fotos leves e não tem erro de JavaScript", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("/");
  await expect(page).toHaveTitle(/Nany.*Guarapuava/);
  await expect(page.locator("html")).toHaveAttribute("lang", "pt-BR");
  await expect(page.locator(cards)).toHaveCount(12);
  await expect(page.getByText("35 peças encontradas", { exact: true })).toBeVisible();
  await expect(page.locator(".hero-photo-frame img")).toHaveAttribute(
    "src",
    /\/images\/optimized\/.*\.webp$/,
  );
  await expect
    .poll(() =>
      page
        .locator(".hero-photo-frame img")
        .evaluate((image: HTMLImageElement) => image.naturalWidth),
    )
    .toBeGreaterThan(0);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await expect(page.locator("script[data-debug]")).toHaveCount(0);
  expect(errors).toEqual([]);
});

test("busca sem acentos, filtra, ordena e restaura filtros ao recarregar", async ({ page }) => {
  await page.goto("/#catalogo");
  const search = page.getByRole("searchbox", { name: "Buscar semijoias" });
  await search.fill("coracao");
  await expect(page.locator(cards)).toHaveCount(9);
  await page.getByRole("button", { name: "Anéis", exact: true }).click();
  await expect(page.getByText("Ainda não encontramos essa combinação.")).toBeVisible();
  await page.getByRole("button", { name: "Ver todas as peças", exact: true }).click();
  await page.getByRole("button", { name: "Anéis", exact: true }).click();
  await expect(page.locator(cards)).toHaveCount(4);
  await page.getByRole("combobox", { name: "Ordenar peças" }).selectOption("menor");
  await expect(page.locator(cards).first()).toContainText("Anel Prateado com Pedras");
  await page.reload();
  await expect(page.getByRole("button", { name: "Anéis", exact: true })).toHaveAttribute(
    "aria-pressed",
    "true",
  );
  await expect(page.getByRole("combobox", { name: "Ordenar peças" })).toHaveValue("menor");
  await page.getByRole("combobox", { name: "Filtrar por preço" }).selectOption("acima80");
  await expect(page.locator(cards)).toHaveCount(2);
});

test("permite conhecer as 35 peças sem carregar todas de uma vez", async ({ page }) => {
  await page.goto("/#catalogo");
  await expect(page.locator(cards)).toHaveCount(12);
  await page.getByRole("button", { name: "Ver mais peças", exact: true }).click();
  await expect(page.locator(cards)).toHaveCount(24);
  await page.getByRole("button", { name: "Ver mais peças", exact: true }).click();
  await expect(page.locator(cards)).toHaveCount(35);
  await expect(page.getByRole("button", { name: "Ver mais peças", exact: true })).toHaveCount(0);
  await expect(page.getByText("Você viu 35 de 35 peças", { exact: true })).toBeVisible();
});

test("detalhes: link direto, preço conhecido, WhatsApp correto e foco por teclado", async ({
  page,
}) => {
  await page.goto("/?categoria=aneis#catalogo");
  const trigger = page.getByRole("button", {
    name: "Ver detalhes de Anel Dourado Largo",
    exact: true,
  });
  await trigger.click();
  const dialog = page.getByRole("dialog", { name: "Anel Dourado Largo", exact: true });
  await expect(dialog).toBeVisible();
  await expect(dialog.locator(".modal-price")).toHaveText(/R\$\s79,90/);
  const url = new URL(
    (await dialog.getByRole("link", { name: "Quero esta peça" }).getAttribute("href"))!,
  );
  expect(url.hostname).toBe("wa.me");
  expect(url.pathname).toBe("/5542988089633");
  expect(url.searchParams.get("text")).toContain("Anel Dourado Largo");
  await expect(page).toHaveURL(/peca=anel-dourado-largo/);
  await page.keyboard.press("Shift+Tab");
  expect(await dialog.evaluate((element) => element.contains(document.activeElement))).toBe(true);
  await page.keyboard.press("Escape");
  await expect(dialog).not.toBeVisible();
  await expect(trigger).toBeFocused();
  await page.goto("/?peca=anel-dourado-largo");
  await expect(page.getByRole("dialog", { name: "Anel Dourado Largo" })).toBeVisible();
  await page.reload();
  await expect(page.getByRole("dialog", { name: "Anel Dourado Largo" })).toBeVisible();
});

test("peça sob consulta não inventa preço e o botão voltar fecha os detalhes", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Conhecer esta peça", exact: true }).click();
  const dialog = page.getByRole("dialog", { name: "Brinco Coração Canelado" });
  await expect(dialog).toBeVisible();
  await expect(dialog.getByText("Preço sob consulta", { exact: true })).toBeVisible();
  const link = new URL(
    (await dialog.getByRole("link", { name: "Consultar no WhatsApp" }).getAttribute("href"))!,
  );
  expect(link.searchParams.get("text")).toContain("gostaria de saber o preço");
  await dialog.getByRole("button", { name: "Ver de pertinho — ampliar foto" }).click();
  await expect(dialog.getByRole("button", { name: "Diminuir foto" })).toHaveAttribute(
    "aria-pressed",
    "true",
  );
  await page.goBack();
  await expect(dialog).not.toBeVisible();
});

test("seleção persiste, soma valores conhecidos e envia uma única mensagem", async ({ page }) => {
  await page.goto("/#catalogo");
  await page
    .getByRole("button", { name: "Salvar Brinco Coração Canelado na seleção", exact: true })
    .click();
  await page
    .getByRole("button", { name: "Salvar Anel Dourado Largo na seleção", exact: true })
    .click();
  await expect(page.getByRole("button", { name: "Abrir sua seleção, 2 peças" })).toBeVisible();
  await page.reload();
  await page.getByRole("button", { name: "Abrir sua seleção, 2 peças" }).click();
  const dialog = page.getByRole("dialog", { name: /Sua seleção/ });
  await expect(dialog).toBeVisible();
  await expect(dialog.getByText(/R\$\s79,90/, { exact: true })).toHaveCount(2);
  await expect(dialog.getByText("+ 1 peça com preço sob consulta")).toBeVisible();
  const link = new URL(
    (await dialog
      .getByRole("link", { name: "Enviar seleção pelo WhatsApp" })
      .getAttribute("href"))!,
  );
  expect(link.searchParams.get("text")).toContain("Brinco Coração Canelado");
  expect(link.searchParams.get("text")).toContain("Anel Dourado Largo");
  expect(link.searchParams.get("text")).toContain("1 peça sob consulta");
  await dialog.getByRole("button", { name: "Remover Anel Dourado Largo da seleção" }).click();
  await expect(dialog.getByText(/R\$\s0,00/, { exact: true })).toBeVisible();
  await dialog.getByRole("button", { name: "Remover Brinco Coração Canelado da seleção" }).click();
  await expect(dialog.getByText("Uma seleção com a sua cara")).toBeVisible();
});

test("trata armazenamento inválido e links de peças inexistentes sem quebrar", async ({ page }) => {
  await page.addInitScript((key) => localStorage.setItem(key, "{invalido"), SELECTION_STORAGE_KEY);
  await page.goto("/?peca=nao-existe");
  const dialog = page.getByRole("dialog", { name: "Essa peça não está na vitrine." });
  await expect(dialog).toBeVisible();
  await dialog.getByRole("button", { name: "Voltar para a vitrine" }).click();
  await expect(page.locator(cards)).toHaveCount(12);
  await page.getByRole("button", { name: "Abrir sua seleção", exact: true }).click();
  await expect(page.getByText("Uma seleção com a sua cara")).toBeVisible();
});

test("exibe recuperação quando a API falha e tenta novamente", async ({ page }) => {
  await page.route("**/api/rpc/catalog/list**", (route) => route.abort());
  await page.goto("/#catalogo");
  await expect(page.getByText("A vitrine não carregou desta vez.")).toBeVisible();
  await page.unroute("**/api/rpc/catalog/list**");
  await page.getByRole("button", { name: "Tentar novamente", exact: true }).click();
  await expect(page.locator(cards)).toHaveCount(12);
});

test("uma foto ausente tem alternativa útil em vez de ícone quebrado", async ({ page }) => {
  await page.route("**/images/**", (route) => route.abort());
  await page.goto("/#catalogo");
  await expect(page.locator(cards).first().getByText("Foto indisponível")).toBeVisible();
});

test("coleções, menu, perguntas frequentes e página inexistente são navegáveis", async ({
  page,
  isMobile,
}) => {
  await page.goto("/");
  if (isMobile) await page.getByRole("button", { name: "Abrir menu", exact: true }).click();
  await page
    .getByRole("navigation", { name: "Navegação principal", exact: true })
    .getByRole("link", { name: "Vestuário", exact: true })
    .click();
  await expect(page).toHaveURL(/\/vestuario$/);
  await expect(page.getByText(/As fotos de vestuário ainda não estão publicadas/)).toBeVisible();
  await expect(
    page.getByRole("link", { name: "Consultar vestuário", exact: true }),
  ).toHaveAttribute("href", /wa\.me\/5542988089633/);
  await page.goto("/roupas");
  await expect(page).toHaveTitle(/Vestuário/);
  await page.goto("/lingerie");
  await expect(page.getByText(/As fotos de lingerie ainda não estão publicadas/)).toBeVisible();
  await page.getByRole("link", { name: "Explorar semijoias", exact: true }).click();
  await expect(page.locator(cards)).toHaveCount(12);
  await page.locator("summary").filter({ hasText: "Como faço meu pedido?" }).click();
  await expect(page.getByText(/Abra uma peça e toque no botão do WhatsApp/)).toBeVisible();
  await page.goto("/caminho-inexistente");
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "Esse caminho não está aqui.",
  );
  await page.getByRole("link", { name: "Voltar para a Nany", exact: true }).click();
  await expect(page.locator(cards)).toHaveCount(12);
});

test("auditoria automática de acessibilidade na vitrine, peça e seleção", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator(cards)).toHaveCount(12);
  const audit = async () => {
    const result = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
      .analyze();
    expect(result.violations).toEqual([]);
  };
  await audit();
  await page.getByRole("button", { name: "Conhecer esta peça", exact: true }).click();
  await expect(page.getByRole("dialog", { name: "Brinco Coração Canelado" })).toBeVisible();
  await audit();
  await page.getByRole("dialog").getByRole("button", { name: "Salvar na minha seleção" }).click();
  await page.getByRole("dialog").getByRole("button", { name: "Fechar janela" }).click();
  await page.getByRole("button", { name: "Abrir sua seleção, 1 peça" }).click();
  await expect(page.getByRole("dialog", { name: /Sua seleção/ })).toBeVisible();
  await audit();
});

test("seleção funciona na visita mesmo quando o navegador bloqueia armazenamento", async ({
  page,
}) => {
  await page.addInitScript(() => {
    Object.defineProperty(Storage.prototype, "getItem", {
      value: () => {
        throw new DOMException("Bloqueado", "SecurityError");
      },
    });
    Object.defineProperty(Storage.prototype, "setItem", {
      value: () => {
        throw new DOMException("Bloqueado", "SecurityError");
      },
    });
  });
  await page.goto("/#catalogo");
  await page
    .getByRole("button", { name: "Salvar Anel Dourado Largo na seleção", exact: true })
    .click();
  await page.getByRole("button", { name: "Abrir sua seleção, 1 peça" }).click();
  await expect(
    page.getByRole("dialog", { name: /Sua seleção/ }).getByText("Anel Dourado Largo"),
  ).toBeVisible();
});

test("compartilhamento oferece link manual quando APIs do navegador não existem", async ({
  page,
}) => {
  await page.addInitScript(() => {
    Object.defineProperty(navigator, "share", { value: undefined, configurable: true });
    Object.defineProperty(navigator, "clipboard", { value: undefined, configurable: true });
  });
  await page.goto("/?peca=anel-dourado-largo");
  const dialog = page.getByRole("dialog", { name: "Anel Dourado Largo" });
  await dialog.getByRole("button", { name: "Compartilhar esta peça" }).click();
  await expect(dialog.getByRole("textbox", { name: "Copie o link para compartilhar" })).toHaveValue(
    /\?peca=anel-dourado-largo$/,
  );
  await dialog.evaluate((element) => {
    element.scrollTop = element.scrollHeight;
  });
  await expect(dialog.getByRole("button", { name: "Fechar janela" })).toBeInViewport();
});

test("layout não transborda em celular pequeno, tablet e notebook", async ({ page }) => {
  for (const width of [320, 768, 1024]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/");
    await expect(page.locator(cards)).toHaveCount(12);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(
      true,
    );
  }
});
