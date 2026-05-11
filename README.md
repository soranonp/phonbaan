# phonbaan.com — โปรแกรมคำนวณค่างวดผ่อนบ้าน

เว็บไซต์คำนวณค่างวดผ่อนบ้านภาษาไทย เน้น SEO สำหรับคนไทยที่จะกู้ซื้อบ้าน/คอนโด หรือผ่อนอยู่และอยากโปะ/รีไฟแนนซ์

## Tech Stack

- Next.js 15 + App Router + TypeScript
- Tailwind CSS v4
- Recharts
- Static export สำหรับ Cloudflare Pages

## Development

```bash
npm install
npm run dev
```

เปิด [http://localhost:3000](http://localhost:3000)

## Build & Deploy

```bash
npm run build
```

ไฟล์ static จะอยู่ใน `out/` — deploy ไป Cloudflare Pages โดยชี้ build output ไปที่โฟลเดอร์นี้
