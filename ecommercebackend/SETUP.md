# 🚀 E-commerce Backend Setup Guide

This guide will help you set up the e-commerce backend project on your local machine.

## 📋 Prerequisites

### Required Software
- **Node.js** (v16 or higher) - [Download here](https://nodejs.org/)
- **MySQL** (v8.0 or higher) - [Download here](https://dev.mysql.com/downloads/mysql/)
- **Git** - [Download here](https://git-scm.com/)

### Installation by OS

#### macOS
```bash
# Install Homebrew (if not installed)
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Install Node.js
brew install node

# Install MySQL
brew install mysql
```

#### Windows
- Download and install Node.js from https://nodejs.org/
- Download and install MySQL from https://dev.mysql.com/downloads/mysql/
- Download and install Git from https://git-scm.com/

#### Linux (Ubuntu/Debian)
```bash
# Update package list
sudo apt update

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install MySQL
sudo apt install mysql-server

# Install Git
sudo apt install git
```

## 🔧 Project Setup

### 1. Clone the Repository
```bash
git clone <your-github-repo-url>
cd ecommercebackend
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Database Setup

#### Start MySQL Service
```bash
# macOS
brew services start mysql

# Windows
# Start MySQL service from Services or use MySQL Workbench

# Linux
sudo systemctl start mysql
```

#### Create Database
```bash
mysql -u root -e "CREATE DATABASE IF NOT EXISTS ecommerce;"
```

#### Verify Database Creation
```bash
mysql -u root -e "SHOW DATABASES;"
```

### 4. Configure Database Connection (Optional)

If you need to customize the database connection, create a `.env` file in the project root:

```bash
# Create .env file
touch .env
```

Add the following content to `.env`:
```env
# Database Configuration
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password_here
DB_NAME=ecommerce
DB_PORT=3306

# Server Configuration
PORT=5000
NODE_ENV=development
```

**Note:** If you create a `.env` file, you'll need to update `config/db.js` to use these environment variables.

### 5. Start the Application

#### Development Mode (with auto-restart)
```bash
npm run dev
```

#### Production Mode
```bash
npm start
```

## 🧪 Testing the Setup

### 1. Check Server Status
```bash
curl http://localhost:5000/api/health
```

Expected response:
```json
{
  "success": true,
  "message": "✅ Serveur opérationnel",
  "timestamp": "2025-06-24T09:39:09.860Z",
  "database": "MySQL via XAMPP",
  "architecture": "MVC"
}
```

### 2. Test Categories API
```bash
# Get all categories
curl http://localhost:5000/api/categories

# Create a category
curl -X POST http://localhost:5000/api/categories \
  -H "Content-Type: application/json" \
  -d '{"name": "Test Category"}'
```

### 3. Test Products API
```bash
# Get all products
curl http://localhost:5000/api/products

# Create a product
curl -X POST http://localhost:5000/api/products \
  -H "Content-Type: application/json" \
  -d '{"name": "Test Product", "price": 99.99, "category_id": 1}'
```

## 📚 Available Scripts

```bash
npm start          # Start the server in production mode
npm run dev        # Start the server in development mode with nodemon
npm run setup-db   # Setup database (if you have setup scripts)
npm run migrate    # Run database migrations (if you have migration scripts)
npm run seed       # Seed the database with sample data (if you have seed scripts)
```

## 🔗 API Endpoints

### Categories
- `GET /api/categories` - Get all categories
- `POST /api/categories` - Create a new category
- `GET /api/categories/:id` - Get category by ID
- `PUT /api/categories/:id` - Update category
- `DELETE /api/categories/:id` - Delete category

### Products
- `GET /api/products` - Get all products
- `POST /api/products` - Create a new product
- `GET /api/products/:id` - Get product by ID
- `PUT /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product
- `GET /api/products/category/:categoryId` - Get products by category
- `GET /api/products/search/:term` - Search products

## 🐛 Troubleshooting

### Common Issues

#### 1. MySQL Connection Error
```
Error: connect ECONNREFUSED ::1:3306
```
**Solution:** Make sure MySQL is running
```bash
# macOS
brew services start mysql

# Linux
sudo systemctl start mysql
```

#### 2. Database Not Found
```
Error: Unknown database 'ecommerce'
```
**Solution:** Create the database
```bash
mysql -u root -e "CREATE DATABASE IF NOT EXISTS ecommerce;"
```

#### 3. Permission Denied
```
Error: Access denied for user 'root'@'localhost'
```
**Solution:** Set MySQL root password or create a new user
```bash
# Set root password
mysql -u root -e "ALTER USER 'root'@'localhost' IDENTIFIED BY 'your_password';"

# Or create a new user
mysql -u root -e "CREATE USER 'ecommerce_user'@'localhost' IDENTIFIED BY 'password';"
mysql -u root -e "GRANT ALL PRIVILEGES ON ecommerce.* TO 'ecommerce_user'@'localhost';"
```

#### 4. Port Already in Use
```
Error: listen EADDRINUSE: address already in use :::5000
```
**Solution:** Change the port or kill the process using port 5000
```bash
# Kill process on port 5000
lsof -ti:5000 | xargs kill -9

# Or change the port in your .env file
PORT=5001
```

## 📞 Support

If you encounter any issues not covered in this guide, please:
1. Check the troubleshooting section above
2. Review the error logs in the terminal
3. Create an issue in the GitHub repository with detailed error information

## 🎉 Success!

Once you see the server startup message and can access the health endpoint, your setup is complete and ready for development! 