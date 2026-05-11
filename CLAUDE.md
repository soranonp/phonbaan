# PhonBaan — เว็บคำนวณค่างวดผ่อนบ้าน

## Project Overview
เว็บไซต์ utility tool ภาษาไทย เน้น SEO สำหรับ keyword "คำนวณผ่อนบ้าน"
Target audience: คนไทยที่จะกู้ซื้อบ้าน/คอนโด หรือผ่อนอยู่และอยากโปะ/รีไฟแนนซ์

## Tech Stack (เหมือน tobtonn — ห้ามเปลี่ยน)
- Next.js 15 (App Router) + TypeScript + Tailwind CSS v4
- shadcn/ui components
- Static export (output: 'export') deploy บน Cloudflare Pages
- ไม่มี database, ไม่มี API routes, ไม่มี server actions
- ทุก calculator ต้องเป็น Client Component ('use client')

## Brand & Color
- Primary color: น้ำเงินสไตล์ออมสิน/ธนาคาร (เน้นความน่าเชื่อถือ)
  - Primary: #00529C หรือใกล้เคียง (น้ำเงินเข้ม)
  - Accent: #FFB81C (เหลืองทอง — ใช้เป็นจุดเน้น)
  - ปรับ Tailwind theme ให้ใช้สีนี้
- Font: ตามที่ tobtonn ใช้อยู่ (อาจเป็น Sarabun/Prompt)

## ภาษาและสไตล์
- UI ทุกข้อความเป็นภาษาไทย ยกเว้นโค้ด/comment ภาษาอังกฤษ
- โทนเป็นกันเอง อ่านง่าย แต่ดูน่าเชื่อถือ (สไตล์ธนาคาร)
- ใช้คำว่า "บ้าน" ไม่ใช่ "ที่อยู่อาศัย"
- format ตัวเลข: comma separator (1,500,000 บาท)

## SEO Requirements (ทุกหน้าต้องมี)
- metadata: title, description, openGraph, alternates.canonical
- title format: "[เนื้อหา] | PhonBaan"
- description ภาษาไทย 150-160 ตัวอักษร
- JSON-LD: WebApplication สำหรับ calculator, Article สำหรับ blog, FAQPage สำหรับ FAQ
- H1 หนึ่งอันต่อหน้า

## Pages to Build (จะทยอยทำตามลำดับ)
- [ ] / (homepage) — calculator หลัก: คำนวณค่างวดผ่อนบ้าน
- [ ] /khondo/ — คำนวณผ่อนคอนโด
- [ ] /pho-baan/ — คำนวณโปะบ้าน (★ differentiator)
- [ ] /wong-ngern-ku/ — คำนวณวงเงินกู้บ้าน
- [ ] /refinance/ — คำนวณรีไฟแนนซ์
- [ ] /blog/ + /blog/[slug]/
- [ ] /about/, /contact/, /privacy-policy/, /cookie-policy/
- [ ] /not-found, sitemap.xml, robots.txt

## Code Style
- TypeScript strict mode
- ห้ามใช้ any → ใช้ unknown หรือ proper type
- function: const arrow functions
- แยก calculation logic ไป lib/calculations.ts
- Component ห้ามเกิน 200 บรรทัด

## Constraints (ห้ามทำ)
- ห้ามใช้ next/image (ใช้ <img>)
- ห้ามใช้ Server Actions / API Routes
- ห้ามใส่ localStorage โดยไม่ check typeof window
- ห้ามติดตั้ง library ใหม่โดยไม่ถาม

## Working Style
- ทำทีละงาน อย่าทำเกินคำสั่ง
- ใช้ Plan Mode ทุกครั้งเมื่อแก้หลายไฟล์
- หลังทำเสร็จ บอกสั้นๆ ว่าทำอะไรไป + suggest next step 1-2 บรรทัด
