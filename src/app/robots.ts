import type { MetadataRoute } from "next";

// Los demos llevan noindex hasta que el cliente paga (modulos/03-sitio-base.md,
// "Los demos no se indexan" — go-live recién abre esto).
const IS_DEMO = process.env.NEXT_PUBLIC_IS_DEMO === "true";

export default function robots(): MetadataRoute.Robots {
  if (IS_DEMO) {
    return {
      rules: { userAgent: "*", disallow: "/" },
    };
  }
  return {
    rules: { userAgent: "*", allow: "/" },
  };
}
