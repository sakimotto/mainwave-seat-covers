/**
 * One-off content update: Thai product content + origin-story fix.
 * Run: npx tsx prisma/update-thai-content.ts
 *
 * - Fixes EN seat-cover descriptions: "Manufactured in Melbourne" →
 *   "Manufactured in our own Thailand factory"
 * - Sets nameTh / descriptionTh for every product (vehicle names stay Latin)
 */
import "dotenv/config"
import { prisma } from "../src/lib/prisma"

const TH_TEMPLATE = (vehicle: string) =>
  `คลุมเบาะนีโอพรีนพรีเมียม ตัดเย็บตามแบบเฉพาะสำหรับ ${vehicle} ผลิตในโรงงานของเราเองในประเทศไทย ด้วยนีโอพรีนแบบเซลล์ปิดหนา 4 มม. — วัสดุเดียวกับชุดดำน้ำระดับไฮเอนด์ ทุกชุดตัดด้วยแม่แบบเฉพาะรุ่นรถเพื่อให้เข้ารูปสนิทเหมือนเดิมจากโรงงาน ไม่หย่อนหรือเลื่อน ชั้นกันน้ำด้านหลังปกป้องเบาะเดิมจากของเหลว โคลน และการสึกหรอในทุกวัน ส่วนผิวนอกกันรังสี UV ไม่ซีดจางแม้ตากแดดนาน ติดตั้งภายใน 15 นาที ไม่ต้องใช้เครื่องมือ เพียงสวมทับเบาะและล็อกด้วยระบบยึดในตัว รับประกันจากผู้ผลิต 3 ปี`

const MERCH_TH: Record<string, { nameTh: string; descriptionTh: string }> = {
  "mainwave-boot-organiser": {
    nameTh: "กล่องจัดระเบียบท้ายรถ Mainwave — พับได้",
    descriptionTh: "จัดระเบียบท้ายรถให้เป็นระเบียบด้วยกล่องเก็บของพับได้ โครงแข็งแรงคงรูปเมื่อใส่ของ แต่พับแบนได้ในไม่กี่วินาทีเมื่อไม่ใช้งาน ตัวแบ่งบุนวม 2 ชิ้น แบ่งพื้นที่สำหรับของชำ เครื่องมือ อุปกรณ์กีฬา หรือของแคมป์ ฐานเสริมแรงพร้อมแผ่นกันลื่น ไม่เลื่อนระหว่างเข้าโค้ง หูหิ้วคู่ยกออกง่าย ผิวนอกโพลีเอสเตอร์ 600D เช็ดทำความสะอาดง่าย และซับในกันน้ำ เก็บคราบเปื้อนจากของเปียก",
  },
  "mainwave-camping-chair": {
    nameTh: "เก้าอี้แคมป์ปิ้งพับได้ Mainwave รุ่นแข็งแรง",
    descriptionTh: "สร้างมาสำหรับการแคมป์ของจริง โครงเหล็กเคลือบผงรับน้ำหนักได้ 150 กก. พนักพิงแขนเสริมแรง ผ้าอ๊อกซ์ฟอร์ดเย็บสองตะเข็บ ไม่หย่อนแม้ใช้ทั้งฤดู ที่วางแก้วลึกในพนักพิงขวา วางเครื่องดื่มมั่นคงบนพื้นไม่เรียบ พนักพิงสูงรองรับศีรษะและคอ พับแบนพร้อมกระเป๋าหิ้ว เก็บหลังเบาะหรือท้ายรถได้สบาย โลโก้ Mainwave ปักที่พิงศีรษะ",
  },
  "mainwave-car-mats-front": {
    nameTh: "พรมปูพื้นรถตัดตามรุ่น Mainwave — ชุดหน้า",
    descriptionTh: "พรมปูพื้นรถตัดแม่นตามแผ่นพื้นของรถคุณ วัดด้วยเลเซอร์และตัด CNC จากพรมหนัก 900 กรัม/ตร.ม. พร้อมแผ่นรองส้นเท้ายางกันน้ำฝั่งคนขับ ด้านหลังยางกันลื่น อยู่กับที่ ไม่ม้วน ไม่เลื่อน ไม่ติดคันเร่ง มีรูคลิปแบบเดิมศูนย์สำหรับรถที่มีหมุดล็อก มีสีดำและเทาเข้ม ทนโคลน ทราย กาแฟหก และการใช้งานหนักทุกวัน ขายเป็นคู่หน้า",
  },
  "mainwave-cotton-tshirt": {
    nameTh: "เสื้อยืดคอตตอนพรีเมียม Mainwave",
    descriptionTh: "ผลิตจากคอตตอนหวี 100% หนา 250 แกรม สัมผัสแน่น ทนทาน คอเสื้อเสริมแรง ตะเข็บคู่ พิมพ์โลโก้ Mainwave ที่อก ทรงเรกูลาร์ทันสมัย ใส่ชายในหรือนอกก็ดูดี ผ้าหดมาแล้ว ทรงไม่เสียหลังซัก มี 5 ไซซ์ 4 สี",
  },
  "mainwave-duffel-bag-60l": {
    nameTh: "กระเป๋าดัฟเฟิล Mainwave แข็งแรง — 60 ลิตร",
    descriptionTh: "ออกแบบมาให้ทนชีวิตหนักทั้งบนรถกระบะและท้ายรถครอบครัว ผลิตจากโพลีเอสเตอร์ริปสต็อป 600D ก้นกระเป๋าเคลือบ TPU กันน้ำ ทนโคลน ฝน และฝุ่น ช่องหลักเปิดกว้างด้วยซิป YKK แข็งแรง ช่องปลายแยกรองเท้าบูทหรือของสกปรก หูหิ้วบุนวมและสายสะพายถอดได้ปรับระดับ โลโก้ Mainwave สะท้อนแสง",
  },
  "mainwave-insulated-lunch-bag": {
    nameTh: "กระเป๋าใส่อาหารกลางวันเก็บอุณหภูมิ Mainwave",
    descriptionTh: "กระเป๋าใส่อาหารเก็บอุณหภูมิแข็งแรง เก็บความเย็นได้ 6 ชั่วโมง หรือความร้อน 3 ชั่วโมง ฉนวนโฟมเซลล์ปิด 8 มม. ผิวนอกโพลีเอสเตอร์ 600D ซับใน PEVA เกรดอาหาร เช็ดสะอาดในไม่กี่วินาที ช่องหลักใส่กล่องข้าวเต็มใบ ขวดน้ำ และของว่าง ช่องซิปหน้าใส่ช้อนส้อม ทิชชู่ หรือโทรศัพท์ หูหิ้วเสริมแรงและสายสะพายถอดได้ โลโก้ Mainwave สะท้อนแสง",
  },
  "mainwave-leather-keyring": {
    nameTh: "พวงกุญแจหนังแท้ Mainwave",
    descriptionTh: "พวงกุญแจเรียบง่ายคุณภาพดี ยิ่งใช้ยิ่งสวย ตัดจากหนังแท้ฟูลเกรนสีน้ำตาลแซดเดิล ขึ้นเงาเฉพาะตัวตามเวลา โลโก้ Mainwave ปั๊มฟอยล์ร้อน ไม่ใช่งานพิมพ์ จึงไม่ลอกไม่จาง เย็บสองตะเข็บด้วยด้ายไนลอน พร้อมคลิปหมุนทองเหลืองแท้ ไม่ขึ้นสนิม มาในถุงผ้าฝ้ายของขวัญ",
  },
  "mainwave-outdoor-blanket": {
    nameTh: "ผ้าปูเอาต์ดอร์ Mainwave — ไซซ์ปิกนิก",
    descriptionTh: "ผ้าปูเอาต์ดอร์แข็งแรงสำหรับทุกกิจกรรม ชั้นบนฟลีซนุ่มสัมผัสดี ชั้นล่างโพลีเอสเตอร์ 300D กันน้ำ กันความชื้นและคราบดิน ขนาดใหญ่ 150 x 180 ซม. นั่งได้ 4 คนสบาย ๆ สายรัดและปิดแบบม้วนเก็บ พับ ม้วน คลิป แล้วออกเดินทาง หูหิ้วใช้แขวนตากได้ โลโก้ Mainwave ทอที่มุม ซักเครื่องได้ถนอมผ้า",
  },
  "mainwave-polo-shirt": {
    nameTh: "เสื้อโปโลเพอร์ฟอร์มานซ์ Mainwave",
    descriptionTh: "เสื้อโปโลพรีเมียมสำหรับคนทำงานและสายเอาต์ดอร์ ผ้าคอตตอนปิเก้ผสมอีลาสเทนเล็กน้อย ระบายอากาศดี ยืดตามการเคลื่อนไหว ปกกระดุมสามเม็ด ชายผ่าข้างเสริมแรง โลโก้ Mainwave ปักด้ายแดงที่อกซ้าย ทรงเข้ารูปไม่หลวม คงทรงและสีผ่านการซักหลายครั้ง",
  },
  "mainwave-scuff-plate-protectors": {
    nameTh: "แผ่นกันรอยท้ายประตูและกันชน Mainwave — ชุด 4 ชิ้น",
    descriptionTh: "หยุดรอยขีดข่วนจากการเข้าออกรถและขนของก่อนทำสีรถเสีย ชุด 4 ชิ้นครอบขอบกันชนท้าย (จุดที่โดนรอยมากสุด) และธรณีประตู 3 จุด ตัดแม่นจากไวนิลลายคาร์บอนไฟเบอร์ 3M กาวแน่นถาวรบนสีที่สะอาด กัน UV และสภาพอากาศ ไม่เหลือง ไม่ลอก แม้ใช้เป็นปี แทบมองไม่เห็นเมื่อติดตั้ง สีเดิมของคุณสมบูรณ์อยู่ใต้แผ่นกัน",
  },
  "mainwave-seat-back-organiser": {
    nameTh: "กระเป๋าแขวนหลังเบาะ Mainwave",
    descriptionTh: "จัดห้องโดยสารให้เป็นระเบียบด้วยกระเป๋าแขวนหลังเบาะแข็งแรง แขวนบนพิงศีรษะมาตรฐาน ช่องใส่โทรศัพท์ทัชสกรีนใส ช่องหลักใหญ่ 2 ช่อง กระเป๋าซิปของมีค่า และที่ใส่ขวดตาข่ายคู่ ผ้าโพลีเอสเตอร์ 600D รับน้ำหนักแท็บเล็ต ของว่าง ของเล่น เครื่องมือ ไม่หย่อน ช่องแท็บเล็ตรองรับถึง 10 นิ้ว เหมาะกับทริปครอบครัว ติดตั้งในไม่กี่วินาทีด้วยสายปรับได้และหัวเข็มขัดแบบปลดเร็ว",
  },
  "mainwave-structured-cap": {
    nameTh: "หมวกแก๊ปทรงตั้ง Mainwave",
    descriptionTh: "หมวกแก๊ป 6 แผงสำหรับทุกสภาพอากาศ แผงหน้าทรงสูงคงรูปด้วยซับในแข็ง ปีกโค้งมาพร้อมใช้ โลโก้ Mainwave ปักด้ายแดงตรงกลาง หลังแบบสแนปแบ็คปรับได้ ไซซ์เดียวใส่ได้เกือบทุกคน แถบซับเหงื่อด้านในและรูระบายอากาศ",
  },
  "mainwave-stubby-cooler": {
    nameTh: "ปลอกกระป๋องนีโอพรีน Mainwave",
    descriptionTh: "ผลิตจากนีโอพรีน 4 มม. ชนิดเดียวกับคลุมเบาะของเรา — ถ้ามันทนพอสำหรับรถกระบะ มันก็ทนพอสำหรับเครื่องดื่มของคุณ ใส่กระป๋อง 375 มล. และขวด 330 มล. พอดี โฟมเซลล์ปิด 3 มม. เก็บความเย็น มือไม่เปียก ตะเข็บเชื่อมไม่ใช้กาว ฐานเสริมแรง โลโก้ Mainwave แดงด้านหน้า ล้างเครื่องล้างจานได้ ยืดได้ และแทบทำลายไม่ได้",
  },
}

function thaiName(name: string): string {
  if (name.startsWith("Premium Neoprene Front Seat Covers - "))
    return name.replace("Premium Neoprene Front Seat Covers - ", "คลุมเบาะหน้านีโอพรีนพรีเมียม - ")
  if (name.startsWith("Premium Neoprene Rear Seat Covers - "))
    return name.replace("Premium Neoprene Rear Seat Covers - ", "คลุมเบาะหลังนีโอพรีนพรีเมียม - ")
  if (name.startsWith("Full Set Neoprene Seat Covers - "))
    return name.replace("Full Set Neoprene Seat Covers - ", "คลุมเบาะนีโอพรีนเต็มชุด - ")
  if (name.startsWith("Rear Seat Covers - "))
    return name.replace("Rear Seat Covers - ", "คลุมเบาะหลัง - ")
  throw new Error(`Unmapped seat-cover name: ${name}`)
}

async function main() {
  // 1. Origin-story fix in EN descriptions
  const originFix = await prisma.$executeRaw`
    UPDATE "Product"
    SET description = REPLACE(description, 'Manufactured in Melbourne', 'Manufactured in our own Thailand factory')
    WHERE description LIKE '%Manufactured in Melbourne%'`
  console.log(`EN origin fix: ${originFix} rows`)

  // 2. Thai content
  const products = await prisma.product.findMany({
    select: { id: true, slug: true, name: true, description: true },
  })

  let updated = 0
  for (const p of products) {
    const merch = MERCH_TH[p.slug]
    if (merch) {
      await prisma.product.update({
        where: { id: p.id },
        data: { nameTh: merch.nameTh, descriptionTh: merch.descriptionTh },
      })
      updated++
      continue
    }

    // Seat covers: derive Thai name + template description
    const vehicleMatch = p.description?.match(/custom patterned to fit your (.+?)\. Manufactured/)
    if (!vehicleMatch) {
      console.warn(`SKIP (no vehicle match): ${p.slug}`)
      continue
    }
    await prisma.product.update({
      where: { id: p.id },
      data: {
        nameTh: thaiName(p.name),
        descriptionTh: TH_TEMPLATE(vehicleMatch[1]),
      },
    })
    updated++
  }

  console.log(`Thai content set on ${updated}/${products.length} products`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(() => prisma.$disconnect())
