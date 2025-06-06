# 📅 Event Scheduler

**Event Scheduler** is a modern web application built with **React**, **TypeScript**, and **Vite**.This app allows users to schedule events, edit or delete them, toggle between weekly and monthly views, and persist events across page refreshes using localStorage. It also features a modern UI with Tailwind CSS and shadcn components.

## 🚀 Features

- Event Management: Add, edit, and delete events with titles and dates
- View Toggling: Switch between "This Week" and "This Month" to filter events
- Form Validation: Ensures required fields (title and date) are filled using react-hook-form
- Persistence: Event data is saved in localStorage for a seamless user experience
- Responsive Design: Works on desktop and mobile devices with Tailwind CSS styling
- Modern UI: Uses shadcn components for dialogs, inputs, buttons, and calendars.

## 🧱 Tech Stack

| **Category**      | **Technology**                     | **Purpose**                                       |
| ----------------- | ---------------------------------- | ------------------------------------------------- |
| **Framework**     | Vite + React + TypeScript          | Fast development and strong type safety           |
| **Styling**       | Tailwind CSS v4                    | Utility-first CSS framework for responsive design |
| **UI Components** | ShadCN UI + @radix-ui/react-dialog | Accessible, customizable components and dialogs   |
| **Forms**         | react-hook-form                    | Efficient form handling and validation            |
| **Date Handling** | date-fns                           | Formatting and filtering event dates              |
| **State Storage** | localStorage (browser)             | Persists user-created event data across sessions  |

## 📚 Learning Concepts: React and TypeScript 

This project has provided hands-on experience with several React, TypeScript, and web development concepts:

- Type Safety: Used TypeScript to define event types and ensure type safety across components
- State Management: Applied useState and useEffect for managing events and persisting them in localStorage
- Form Handling: Integrated react-hook-form for form validation and submission handling
- Date Filtering: Used date-fns to filter events by week or month, improving user experience
- Component Styling: Leveraged Tailwind CSS for responsive and modern UI design
- Custom Components: Integrated shadcn components, learning to customize and extend them
- Module Aliases: Configured @ aliases in Vite and TypeScript for cleaner imports (e.g., @/components/ui/button)
- Dependency Management: Resolved npm conflicts using --legacy-peer-deps for packages like date-fns and react-hook-form.

Key Takeaways

- 🔒 TypeScript Enhances Reliability: TypeScript caught potential errors early, improving code quality
- 🔄 Local Storage is Powerful: Persisting events ensured a seamless user experience across refreshes
- ⬇️ Organized Structure Matters: Separating components into src/components/ and UI elements into src/components/ui/ improved maintainability
- ⚙️ Modern Tools Boost Productivity: Vite’s fast HMR and Tailwind’s utility-first approach sped up development

