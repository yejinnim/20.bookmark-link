import { type NextRequest, NextResponse } from "next/server";

export type OgData = {
  url: string;
  title: string;
  description: string;
  thumbnail: string | null;
};

const REQUEST_TIMEOUT_MS = 5000;

function decodeHtmlEntities(text: string): string {
  return text
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");
}

/** <meta property="..." content="..."> 를 속성 순서에 상관없이 찾는다. */
function extractMeta(html: string, keys: string[]): string | null {
  for (const key of keys) {
    const patterns = [
      new RegExp(
        `<meta[^>]+(?:property|name)=["']${key}["'][^>]*content=["']([^"']*)["']`,
        "i"
      ),
      new RegExp(
        `<meta[^>]+content=["']([^"']*)["'][^>]*(?:property|name)=["']${key}["']`,
        "i"
      ),
    ];

    for (const pattern of patterns) {
      const match = html.match(pattern);
      if (match?.[1]) return decodeHtmlEntities(match[1].trim());
    }
  }
  return null;
}

function extractTitleTag(html: string): string | null {
  const match = html.match(/<title[^>]*>([^<]*)<\/title>/i);
  return match?.[1] ? decodeHtmlEntities(match[1].trim()) : null;
}

export async function GET(request: NextRequest) {
  const targetUrl = request.nextUrl.searchParams.get("url");

  if (!targetUrl) {
    return NextResponse.json(
      { error: "url 쿼리 파라미터가 필요합니다." },
      { status: 400 }
    );
  }

  let parsedUrl: URL;
  try {
    parsedUrl = new URL(targetUrl);
    if (!/^https?:$/.test(parsedUrl.protocol)) {
      throw new Error("지원하지 않는 프로토콜입니다.");
    }
  } catch {
    return NextResponse.json(
      { error: "유효한 URL 형식이 아닙니다." },
      { status: 400 }
    );
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    const response = await fetch(parsedUrl.toString(), {
      signal: controller.signal,
      redirect: "follow",
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; BookmarkLinkBot/1.0)",
        Accept: "text/html",
      },
    });

    if (!response.ok) {
      return NextResponse.json(
        {
          error: `대상 페이지를 불러오지 못했습니다. (status: ${response.status})`,
        },
        { status: 502 }
      );
    }

    const html = await response.text();
    const finalUrl = response.url || parsedUrl.toString();

    const title =
      extractMeta(html, ["og:title", "twitter:title"]) ??
      extractTitleTag(html) ??
      finalUrl;

    const description =
      extractMeta(html, [
        "og:description",
        "twitter:description",
        "description",
      ]) ?? "";

    const rawThumbnail = extractMeta(html, ["og:image", "twitter:image"]);
    const thumbnail = rawThumbnail
      ? new URL(rawThumbnail, finalUrl).toString()
      : null;

    const data: OgData = { url: finalUrl, title, description, thumbnail };

    return NextResponse.json(data);
  } catch (error) {
    const message =
      error instanceof Error && error.name === "AbortError"
        ? "요청 시간이 초과되었습니다."
        : "오픈 그래프 정보를 가져오는 중 오류가 발생했습니다.";

    return NextResponse.json({ error: message }, { status: 502 });
  } finally {
    clearTimeout(timeout);
  }
}
