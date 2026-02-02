FROM node:18-alpine

WORKDIR /app

# 1. ก๊อบปี้ไฟล์รายการ Library ไปก่อน
COPY package*.json ./

# 2. สั่งติดตั้ง Library ภายในตู้ Docker
RUN npm install

# 3. ก๊อบปี้โค้ดทั้งหมดในโฟลเดอร์ frtPws ตามเข้าไป
COPY . .

# 4. สั่งรันหน้าเว็บพร้อมเปิดทางให้คนนอกเข้าดูได้
CMD ["npm", "run", "dev", "--", "--host"]