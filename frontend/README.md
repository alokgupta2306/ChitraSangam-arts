# ChitraSangam Arts 

> Where every stroke tells a story

A full-stack painting e-commerce platform built on the MERN stack. Connects artists with customers by providing a marketplace for buying, renting, and ordering custom paintings.

---

##  Live Links

- **Frontend:** https://chitrasangam-arts.netlify.app
- **Backend API:** https://chitrasangam-arts.onrender.com

---

##  Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React.js + Vite + Tailwind CSS |
| Backend | Node.js + Express.js |
| Database | MongoDB Atlas |
| Authentication | JWT + bcryptjs |
| Payment | Razorpay |
| File Uploads | Cloudinary + Multer |
| Deployment | Netlify + Render |

---

##  User Roles

### Admin
- Add and manage artists and delivery partners
- Upload paintings to store
- Assign work to artists
- Assign delivery partners to orders
- View finance tally and all transactions

### Artist
- View assigned work
- Upload completed paintings
- View earnings history

### Customer
- Browse, buy, rent or order custom paintings
- Pay online via Razorpay or Cash on Delivery
- Track orders with real-time status
- Confirm delivery by scanning QR code

### Delivery Partner
- View assigned deliveries
- Show QR code to customer for delivery confirmation
- Record COD cash collection

---

##  Features

- JWT Role-Based Authentication
- Razorpay Payment Gateway (UPI, Cards, Net Banking)
- QR Code delivery confirmation system
- Cash on Delivery (COD) tracking
- Finance tally with profit calculation
- Custom painting order system
- Real-time order status tracking
- Mobile responsive with hamburger menu
- Beautiful UI with Indian art theme

---

##  Getting Started

### Prerequisites
- Node.js installed
- MongoDB Atlas account
- Razorpay account

### Clone the repo
```bash
git clone https://github.com/alokgupta2306/ChitraSangam-arts.git
cd ChitraSangam-arts
```

### Backend Setup
```bash
cd backend
npm install
```

Create `.env` file (see `.env.example`):
```
PORT=5000
MONGO_URI=your_mongodb_url
JWT_SECRET=your_jwt_secret
ADMIN_EMAIL=your_admin_email
ADMIN_PASSWORD=your_admin_password
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
```

Run backend:
```bash
npm run dev
```

### Frontend Setup
```bash
cd frontend
npm install
```

Create `.env` file:
```
VITE_API_URL=http://localhost:5000/api
VITE_RAZORPAY_KEY_ID=your_razorpay_key_id
```

Run frontend:
```bash
npm run dev
```

---

##  Folder Structure
```
chitrasangam-arts/
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── adminController.js
│   │   ├── assignDeliveryController.js
│   │   ├── assignmentController.js
│   │   ├── authController.js
│   │   ├── customOrderController.js
│   │   ├── deliveryController.js
│   │   ├── financeController.js
│   │   ├── joinController.js
│   │   ├── orderController.js
│   │   ├── paintingController.js
│   │   └── razorpayController.js
│   ├── middleware/
│   │   └── authMiddleware.js
│   ├── models/
│   │   ├── Assignment.js
│   │   ├── CustomOrder.js
│   │   ├── JoinApplication.js
│   │   ├── Order.js
│   │   ├── Painting.js
│   │   └── User.js
│   ├── routes/
│   │   ├── adminRoutes.js
│   │   ├── assignDeliveryRoutes.js
│   │   ├── assignmentRoutes.js
│   │   ├── authRoutes.js
│   │   ├── customOrderRoutes.js
│   │   ├── deliveryRoutes.js
│   │   ├── financeRoutes.js
│   │   ├── joinRoutes.js
│   │   ├── orderRoutes.js
│   │   ├── paintingRoutes.js
│   │   └── razorpayRoutes.js
│   ├── .env.example
│   ├── .gitignore
│   └── server.js
└── frontend/
    ├── public/
    │   └── _redirects
    ├── src/
    │   ├── api/
    │   │   └── axios.js
    │   ├── components/
    │   │   ├── DoodleBg.jsx
    │   │   ├── Logo.jsx
    │   │   └── Navbar.jsx
    │   ├── context/
    │   │   └── AuthContext.jsx
    │   ├── pages/
    │   │   ├── admin/
    │   │   ├── artist/
    │   │   ├── customer/
    │   │   ├── delivery/
    │   │   ├── About.jsx
    │   │   ├── Home.jsx
    │   │   ├── JoinUs.jsx
    │   │   ├── Login.jsx
    │   │   └── Signup.jsx
    │   ├── App.jsx
    │   ├── index.css
    │   └── main.jsx
    ├── .env.example
    ├── .gitignore
    └── index.html
```

---

##  Login Credentials (Demo)

| Role | Email | Password |
|------|-------|----------|
| Admin | alexshah8168911@gmail.com | admin123 |
| Artist | priya@gmail.com | 9876543210 |
| Customer | test@gmail.com | test123 |

---

##  Before Submitting ZIP

- Remove `node_modules` folder
- Remove `.env` files
- Remove `build` or `dist` folders
- Keep only source code files

---

##  Developer

**Alok Gupta**
- GitHub: [@alokgupta2306](https://github.com/alokgupta2306)

---

*ChitraSangam Arts — Where every stroke tells a story* 