#  SweetShop – Full-Stack Sweets Store

SweetShop is a full-stack MERN application for managing and selling sweets online.  
It provides a public storefront for customers and a secure admin dashboard for managing inventory.


---

##  Features

###  **For Customers**
- Browse available sweets by name, category, and price.
- Purchase sweets directly from the store.
- Real-time stock updates after each purchase.

###  **For Admins**
- **Add** new sweets (bulk or single).
- **Update** sweets information (name, category, price, quantity).
- **Delete** sweets from inventory.
- **Restock** sweets easily.
- Access controlled by **admin login**.

---

##  Tech Stack

| Frontend | Backend | Database | Auth & Others |
|----------|---------|----------|---------------|
| React (Vite) | Node.js + Express.js | MongoDB + Mongoose | JWT Authentication, bcrypt, react-hot-toast |

---

##  Project Structure

sweetshop/
│
├── frontend/
│ ├── src/
│ │ ├── pages/
│ │ │ ├── HomePage.jsx
│ │ │ ├── AdminDashboard.jsx
│ │ └── App.jsx
│ └── package.json
│
├── backend/
│ ├── models/
│ │ ├── User.js
│ │ └── Sweet.js
│ ├── routes/
│ │ ├── adminAuth.js
│ │ ├── sweetsRoutes.js
│ ├── server.js
│ └── package.json
│
└── README.md


---

##  Installation & Setup

###  Clone the repository --bash
git clone https://github.com/Pulishekhar/sweetshop.git
cd sweetshop


 UI Highlights

Modern, colorful interface built with TailwindCSS.

Responsive design for mobile & desktop.

Real-time toast notifications for all operations.

 Future Improvements

Payment integration for purchases.

Sweet image uploads.

Order history for customers.

Analytics dashboard for admins.


Signup page and Login Page 

<img width="892" height="1042" alt="Screenshot 2025-09-26 192215" src="https://github.com/user-attachments/assets/a9fa2f09-e72c-4475-97d1-3a6e60684ffa" />
<img width="986" height="1069" alt="Screenshot 2025-09-26 192227" src="https://github.com/user-attachments/assets/f7b0327b-e789-47e1-8c8e-6f6b46627399" />


Admin Login Page (for crud operation)
<img width="1561" height="986" alt="Screenshot 2025-09-26 194617" src="https://github.com/user-attachments/assets/bfe1601d-e987-4d3b-9713-cf7d08acec13" />
Admins Dashboard
![WhatsApp Image 2025-09-26 at 19 54 23_484e618d](https://github.com/user-attachments/assets/820fee8f-2191-4306-a7d2-70f401269d2f)


User Dashboard 
<img width="1688" height="1033" alt="Screenshot 2025-09-26 192013" src="https://github.com/user-attachments/assets/143900eb-c8d2-4108-8c7f-d069dab23b9b" />




