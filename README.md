# Banner Creator Tool

The Banner Creator Tool is a web application that enables users to create and customize banners easily without writing code. It provides a user-friendly interface to edit various banner properties, including text content, font styles, colors, images, and layout. Users can see real-time updates as they make changes, ensuring a seamless design experience.

## Features

- **Custom Styling**: Adjust font styles, sizes, and colors with a simple UI.
- **Live Editing**: Changes are applied instantly without page refresh.
- **Image Upload Support**: Change banner background and element images via file uploads.
- **Viewport-Based Editing**: Customize banners for different screen sizes and store styles separately for each viewport.
- **Preview Mode**: Preview the designed banner and test it at different screen sizes.
- **Accessibility Check**: Includes a color contrast checker to ensure readable designs.

## Technologies Used

- **React**: For building the user interface.
- **TypeScript**: For static typing to catch errors early.
- **React Color**: For color pickers.
- **Jest & React Testing Library:** For testing.
- **CSS**: For styling the application.
- **Color Contrast Checker**: Ensures color accessibility compliance.
- **ESLint, Stylelint & Prettier**: For maintaining code consistency and quality.
- **Vite + SWC**: For a fast and efficient development environment.
- **vite-plugin-svgr:** Converts SVGs into React components for easy use.

## Project Structure

The project is organized in the following directory structure:

```
├── public/               # Static assets (images, fonts, etc.)
├── src/
│   ├── assets/           # SVGs used as React components
│   ├── components/       # UI components
│   │   ├── styles/       # Component-specific styles
│   │   └── editor/       # Editor-specific components
│   ├── contexts/         # Context providers for state management
│   ├── hooks/            # Custom React hooks
│   ├── constants/        # Data that do not change
│   └── types/            # TypeScript types and interfaces
└── tests/                # Unit tests for components
```

## Running the Project Locally

To run the project locally, follow these steps:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/VriaA/wikimedia_task.git
   ```
2. Install dependencies:
   ```
   npm install
   ```
3. Start the development server:
   ```
   npm run dev
   ```
4. Open your browser and navigate:
   ```
   http://localhost:5173
   ```

## Running Tests

To run unit tests, use the following command:

```
npm run test
```

This will execute all test suites inside the `tests/` directory. You can run specific tests by specifying the file path:
e.g.,

```
npm run test tests/Editor.tsx
```

All test suites:

```
├── tests/
│   ├── Editor.tsx
│   ├── ImageUploader.tsx
│   ├── ColorPicker.tsx
│   └── DropDownMenu.tsx
```

## Linting

Uses Stylelint to adhere to CSS coding conventions for Wikimedia, ESLint for syntax and best practices, and Prettier for keeping the codebase clean and maintainable.
-> To check for linting errors and maintain code consistency, run:

```
npm run lint:all
```
