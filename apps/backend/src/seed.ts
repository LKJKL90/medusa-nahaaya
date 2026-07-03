import { MedusaAppLoader } from "@medusajs/framework"

async function seed() {
  const loader = new MedusaAppLoader()
  await loader.load()
  const container = loader.container

  const regionService = container.resolve("region")
  const productService = container.resolve("product")
  const salesChannelService = container.resolve("sales_channel")

  // 1. Europe region
  const [region] = await regionService.createRegions([
    {
      name: "Europe",
      currency_code: "eur",
      countries: ["FR", "BE", "CH", "LU", "MC", "DE", "ES", "IT", "PT", "NL", "GB"],
    },
  ])
  console.log(`✅ Region: ${region.name} (${region.id})`)

  // 2. Sales channel
  const [sc] = await salesChannelService.createSalesChannels([
    { name: "NAHAAYA Website", description: "Boutique en ligne nahaaya.com" },
  ])
  console.log(`✅ Sales Channel: ${sc.name} (${sc.id})`)

  // 3. Product
  const [product] = await productService.createProducts([
    {
      title: "Huile de Pépins de Figue de Barbarie Pure",
      handle: "huile-figue-barbarie-pure",
      description:
        "Notre huile précieuse, issue des pépins de figue de barbarie du désert marocain. Une goutte d'or liquide aux propriétés anti-âge exceptionnelles, pressée à froid.",
      tags: [{ value: "huile" }, { value: "anti-age" }, { value: "visage" }],
      images: [
        { url: "https://www.nahaaya.com/images/product-marble.jpg" },
        { url: "https://www.nahaaya.com/images/product-desert.jpg" },
        { url: "https://www.nahaaya.com/images/product-marrakech.jpg" },
      ],
      options: [{ title: "Taille", values: ["30ml"] }],
      variants: [
        {
          title: "30ml",
          sku: "NAH-HBP-30",
          prices: [{ amount: 3990, currency_code: "eur", region_id: region.id }],
          options: { Taille: "30ml" },
        } as any,
      ],
    },
  ])
  console.log(`✅ Product: ${product.title} (${product.id})`)
  console.log("🎉 Seed completed!")
  process.exit(0)
}

seed().catch((err) => {
  console.error("Seed failed:", err)
  process.exit(1)
})
