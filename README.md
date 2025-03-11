# E-Commerce App for Men

This is a full-stack e-commerce application built for men's fashion, using **Vite + React** for the frontend and **Django** for the backend.

## 🚀 Features
- User Authentication (Login/Signup)
- Product Listings & Categories
- Add to Cart & Checkout
- Order Management
- Admin Panel for Managing Products
- Secure Payment Integration (Future Scope)

## 🛠 Tech Stack
### **Frontend (Vite + React)**
- React with Vite for fast development
- Tailwind CSS for styling
- React Router for navigation
- Axios for API requests

### **Backend (Django)**
- Django REST Framework (DRF) for API
- PostgreSQL (or SQLite for development)
- Django Authentication
- Cloudinary/S3 for image storage (Future Scope)

## 📂 Project Structure
```
/ecommerce-project
│── /frontend  (React + Vite)
│── /backend   (Django API)
│── README.md  (Project Documentation)
```

## 💻 Setup & Installation
### **1️⃣ Clone the Repository**
```sh
git clone https://github.com/your-username/ecommerce-project.git
cd ecommerce-project
```

### **2️⃣ Setup Backend (Django)**
```sh
python -m venv venv  # Create virtual environment
source venv/bin/activate  # On Mac/Linux
venv\Scripts\activate  # On Windows
pip install -r requirements.txt  # Install dependencies
cd backend
python manage.py migrate  # Apply migrations
python manage.py runserver  # Start Django server
```
Backend will run at **http://127.0.0.1:8000/**.

### **3️⃣ Setup Frontend (React + Vite)**
```sh
cd ../frontend
npm install  # Install dependencies
npm run dev  # Start React development server
```
Frontend will run at **http://localhost:5173/**.

## 📌 API Endpoints (Example)
| Endpoint        | Method | Description             |
|---------------|--------|-------------------------|
| `/api/products/` | GET    | Fetch all products      |
| `/api/products/:id/` | GET    | Fetch single product  |
| `/api/cart/`   | POST   | Add item to cart        |
| `/api/orders/` | POST   | Place an order          |

## 🚀 Future Enhancements
- Payment Gateway Integration (Stripe/PayPal)
- Wishlist & Reviews System
- Advanced Filtering & Sorting

## 🛠 Contributing
Feel free to submit issues and pull requests to improve this project.

## 📜 License
This project is licensed under the MIT License.

---
💡 **Made with ❤️ using Vite + React & Django**

