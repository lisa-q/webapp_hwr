# Webshop README

## 📚 Overview

This website is a project for the "Webprogrammierung" course taught by Florian Bendschus in the "Spezielle Programmiertechniken" module at HWR Berlin. It was developed by Lisa Kütemeier and Laura Voß. The website is an **online shop for pet fashion**, where users can browse products, add them to the cart, and complete orders. All data is stored securely in Firebase.


### Pages Overview

The website consists of the following pages:

- **Pages with Backend communication**:
  - **Product Overview**: Displays a list of products, fetched from Firebase.
  - **Product Detail**: Shows detailed information for each product, fetched from Firebase.
  - **Cart**: Displays the user's cart and communicates with Firebase to store cart data.
  - **Checkout**: Processes user orders and sends order data to Firebase.
  - **Most Bought Products**: Displays the 3 most bought products, fetched from Firebase.
  - **Order History**: Displays past orders, stored in Firebase.

- **Pages without Backend communication**:
  - **Home**: The main landing page of the website.
  - **Impressum**: Displays contact information and opening hours.
  - **About**: Information about the idea behind the online shop.
  - **Thank You**: Confirmation page after completing an order.

## 🛍️ Features

- **Browse Products**: View a variety of products with names, prices, and images.
- **Search**: Find products quickly using the search bar.
- **Product Details**: View detailed information for each product.
- **Add to Cart**: Add items to your shopping cart.
- **Checkout**: Complete your purchase with user details.
- **Order History**: Track past orders and total spending.
- **Most Bought Products**: Displays the 3 products that have been bought the most.
- **Firebase Integration**: Data is stored in Firebase and linked to the user's unique Device ID (stored in local storage).
- **Express.js Backend**: All data is processed via an Express.js backend that communicates with Firebase.



## 🔥 Firebase

Firebase is used to store product and order data in real-time. User data is associated with a unique Device ID, ensuring that the cart and orders are stored and accessible even after refreshing the page.

## 🛠️ Technologies

- **React**: A JavaScript library for building interactive UIs.
- **Express.js**: Backend framework handling all communication with Firebase.
- **Firebase**: Cloud-based platform for data storage and real-time syncing.
- **CSS/Bootstrap**: For responsive and mobile-friendly styling.

## ⚡ Getting Started

### Prerequisites

- Node.js: [Download here](https://nodejs.org)
- Firebase credentials 
  - Stored in a `.env` file for security reasons
  - Please refer to the "Setup" section below for instructions on how to obtain our Firebase credentials

### Setup

1. Clone the repo:
   ```bash
   git clone https://github.com/lisa-q/webapp_hwr
   cd webapp_hwr
   ```
2. Install dependencies:
    ```bash 
    npm install
    ```

3. Set up Firebase:
  - For security reasons, the Firebase credentials are stored in a `.env` file and are not included in the repository.
  - The `.env` file should be placed in the backend folder and contain our Firebase credentials. The contents of this file can be found at the end of our submitted paper. 

4. Set up the backend:
  - Navigate to the `backend` folder: 
    ```bash
    cd backend
    ```
  - Install backend dependencies: 
    ```bash
    npm install
    ```
  - Start the backend server:
    ```bash
    node server.js
    ```
5. Start the frontend application:
  - Open a new terminal and navigate back to the root folder:
      ```bash
      cd ..
      ```
  - Start the React application:
      ```bash
      npm run dev
      ```
