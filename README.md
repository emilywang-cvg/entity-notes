# Entity Notes

A modern web-based entity notes management application built with Vue.js, Ant Design Vue, and Tailwind CSS.

## Features

- 📝 **Create, Edit, and Delete Notes**: Full CRUD operations for managing entity notes
- 🔍 **Advanced Search & Filter**: Search by content, entity type, priority, and tags
- 🏷️ **Tag Management**: Organize notes with customizable tags and suggested tags
- 📊 **Priority System**: Categorize notes with High, Medium, and Low priority levels
- 🎯 **Entity Types**: Support for Customer, Lead, Policy, Claim, and Agent entities
- 📱 **Responsive Design**: Beautiful and modern UI that works on all devices
- 🎨 **Modern UI**: Clean interface built with Ant Design Vue components and Tailwind CSS

## Technologies Used

- **Vue.js 3** - Progressive JavaScript framework with Composition API
- **Ant Design Vue 4** - Enterprise-class UI design language and components
- **Tailwind CSS 3** - Utility-first CSS framework
- **Vite** - Next generation frontend tooling
- **Day.js** - Lightweight date manipulation library

## Project Structure

```
Entity Notes/
├── src/
│   ├── components/          # Vue components
│   │   ├── EntityNotes.vue  # Main notes listing component
│   │   ├── NoteModal.vue    # Add/Edit note modal
│   │   └── NoteDetailModal.vue # Note detail view modal
│   ├── assets/
│   │   └── css/
│   │       └── main.css     # Main styles with Tailwind imports
│   ├── App.vue              # Root component
│   └── main.js              # Application entry point
├── package.json             # Project dependencies and scripts
├── vite.config.js           # Vite configuration
├── tailwind.config.js       # Tailwind CSS configuration
└── postcss.config.js        # PostCSS configuration
```

## Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn package manager

### Installation

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Open your browser and navigate to `http://localhost:3000`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier

## Usage

### Adding a Note

1. Click the "Add Note" button in the top right corner
2. Fill in the required information:
   - **Title**: A descriptive title for your note
   - **Entity Type**: Select the type of entity (Customer, Lead, Policy, Claim, Agent)
   - **Entity ID**: Enter the unique identifier for the entity
   - **Priority**: Choose High, Medium, or Low priority
   - **Created By**: Enter your name
   - **Content**: Add detailed note content
   - **Tags**: Add relevant tags to organize your notes
3. Click "Add Note" to save

### Searching and Filtering

- Use the search bar to find notes by title, content, entity ID, or tags
- Filter by entity type using the entity type dropdown
- Filter by priority using the priority dropdown
- Combine multiple filters for more specific results

### Viewing and Managing Notes

- Click on any note card to view full details
- Use the dropdown menu (⋯) on each note to edit or delete
- Edit notes by clicking the edit button in the detail view or dropdown menu
- Delete notes with confirmation to prevent accidental deletion

## Customization

### Adding New Entity Types

To add new entity types, update the following files:
1. `src/components/EntityNotes.vue` - Add to the entity type filter options
2. `src/components/NoteModal.vue` - Add to the entity type select options
3. `src/components/NoteDetailModal.vue` - Add appropriate icon in `getEntityIcon` function

### Customizing Colors and Themes

- Modify `tailwind.config.js` to customize the color palette
- Update the Ant Design theme in `src/App.vue` by modifying the `colorPrimary` value
- Add custom styles in `src/assets/css/main.css`

## Development

### Component Architecture

- **App.vue**: Main application layout and header
- **EntityNotes.vue**: Core functionality for displaying, searching, and managing notes
- **NoteModal.vue**: Form component for adding and editing notes
- **NoteDetailModal.vue**: Detailed view of individual notes

### State Management

Currently using Vue's reactive system for state management. For larger applications, consider integrating Pinia or Vuex.

### Data Persistence

The application currently uses in-memory storage with sample data. To persist data, integrate with:
- Local Storage for client-side persistence
- REST API for server-side storage
- Database integration (MongoDB, PostgreSQL, etc.)

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Commit your changes: `git commit -am 'Add new feature'`
4. Push to the branch: `git push origin feature/new-feature`
5. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE).

## Support

For support and questions, please open an issue on the project repository.
