# 🍴 Forkify Mini - Recipe Finder Web Application

A modern, responsive web application that allows users to search, view, bookmark, and manage their favorite recipes. Built with vanilla JavaScript using the MVC (Model-View-Controller) architecture pattern.

![Forkify Mini](./Image/logo.png)

## 🌟 Features

### 🔍 Recipe Search

-   Search through over 1,000,000 recipes
-   Real-time search functionality
-   Pagination support for search results
-   Clean and intuitive search interface

### 📱 Recipe Management

-   **View Detailed Recipes**: Complete ingredient lists, cooking instructions, and nutritional information
-   **Bookmark Recipes**: Save your favorite recipes for quick access
-   **Add Custom Recipes**: Create and upload your own recipes
-   **Serving Size Adjustment**: Automatically adjust ingredient quantities based on serving size

### 🎯 Advanced Features

-   **Dark/Night Mode**: Toggle between light and dark themes
-   **Shopping List**: Generate shopping lists from recipe ingredients
-   **Meal Planner**: Plan your meals for the week with an interactive calendar
-   **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices

### 🍽️ Meal Planning

-   Weekly meal planner with drag-and-drop functionality
-   Organize meals by category (Breakfast, Lunch, Dinner, Dessert)
-   Visual meal planning grid for easy organization

## 🛠️ Technologies Used

-   **Frontend**: HTML5, CSS3, Vanilla JavaScript (ES6+)
-   **CSS Framework**: Bootstrap 5.3.3
-   **Icons**: Font Awesome Pro 5 & Font Awesome 6.6.0
-   **Typography**: Google Fonts (Nunito Sans)
-   **Build Tools**: JavaScript Modules (ES6 Modules)
-   **Architecture**: MVC Pattern

## 🚀 Getting Started

### Prerequisites

-   Node.js (for package management)
-   Modern web browser (Chrome, Firefox, Safari, Edge)

### Installation

1. **Clone the repository**

    ```bash
    git clone https://github.com/Zayed-Mohammed-Uddin/Forkify-Mini.git
    cd Forkify-Mini
    ```

2. **Install dependencies**

    ```bash
    npm install
    ```

3. **Open the application**

    ```bash
    # Simply open index.html in your browser, or use a local server
    # For example, using Live Server in VS Code or Python's simple server:
    python -m http.server 3000
    ```

4. **Access the application**
    - Open your browser and navigate to `http://localhost:3000` (if using a local server)
    - Or simply open `index.html` directly in your browser

## 📁 Project Structure

```
Forkify-Mini/
├── index.html                 # Main HTML file
├── style.css                  # Main stylesheet
├── package.json              # Project dependencies and metadata
├── Image/                    # Application images and assets
│   ├── favicon.png
│   ├── logo.png
│   └── spinner.svg
├── dist/                     # Compiled JavaScript modules
│   ├── controller.js         # Main application controller
│   ├── model.js             # Data management and API calls
│   ├── config.js            # Configuration settings
│   └── views/               # View modules (MVC pattern)
│       ├── View.js          # Base view class
│       ├── SearchView.js    # Search functionality
│       ├── RecipeView.js    # Recipe display
│       ├── RecipeListView.js # Recipe search results
│       ├── BookmarkView.js  # Bookmarked recipes
│       ├── AddRecipeView.js # Add new recipes
│       ├── ShoppingListView.js # Shopping list feature
│       ├── MealPlannerView.js # Meal planning
│       ├── PaginationView.js # Search pagination
│       └── NightModeView.js # Dark mode toggle
└── font-awesome/            # Font Awesome icons and fonts
```

## 🎮 Usage Guide

### Searching for Recipes

1. Enter your search term in the search bar (e.g., "pasta", "chicken", "vegetarian")
2. Click the search button or press Enter
3. Browse through the paginated results
4. Click on any recipe to view detailed information

### Managing Recipes

-   **Bookmark**: Click the bookmark icon to save recipes
-   **Adjust Servings**: Use the + and - buttons to change serving sizes
-   **Add to Shopping List**: Generate shopping lists from recipe ingredients
-   **Add Custom Recipe**: Click "Add Recipe" to create your own recipes

### Meal Planning

1. Click on the meal planner to open the weekly view
2. Select a meal category (Breakfast, Lunch, Dinner, Dessert)
3. Drag and drop recipes into the desired time slots
4. Plan your entire week in advance

### Dark Mode

Toggle the switch in the navigation bar to switch between light and dark themes.

## 🔧 API Integration

This application integrates with recipe APIs to fetch recipe data. The API endpoints and configuration are managed in the `config.js` file.

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Zayed Uddin**

-   GitHub: [@Zayed-Mohammed-Uddin](https://github.com/Zayed-Mohammed-Uddin)

## 🙏 Acknowledgments

-   Font Awesome for the amazing icons
-   Bootstrap team for the responsive framework
-   Google Fonts for the beautiful typography
-   The recipe API providers for making this application possible

## 📊 Browser Support

-   ✅ Chrome (latest)
-   ✅ Firefox (latest)
-   ✅ Safari (latest)
-   ✅ Edge (latest)

## 🐛 Known Issues

-   None currently reported

## 📈 Future Enhancements

-   [ ] User authentication and profiles
-   [ ] Recipe ratings and reviews
-   [ ] Social sharing features
-   [ ] Offline recipe storage
-   [ ] Recipe categorization and tagging
-   [ ] Nutritional information tracking
-   [ ] Grocery store integration

---

**© Inspired By Jonas. 2025 Zayed Uddin. All rights reserved.**

⭐ If you found this project helpful, please give it a star on GitHub!
