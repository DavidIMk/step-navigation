# Step Navigation Component

A modern, interactive step navigation component built with Next.js, TypeScript, and Tailwind CSS. This component provides a sleek interface for managing multi-step processes with drag-and-drop functionality and context menu actions.

## Features

- **Drag and Drop**: Reorder steps intuitively using drag-and-drop functionality
- **Context Menu**: Right-click on active steps to access additional actions:
  - Set as first page
  - Rename step
  - Copy step
  - Duplicate step
  - Delete step
- **Interactive Elements**:
  - Add new steps between existing ones
  - Add new pages at the end
  - Visual indicators for active and inactive states
- **Modern Styling**: Clean, modern design with smooth transitions

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/step-navigation.git
cd step-navigation
```

2. Install dependencies:
```bash
pnpm install
```

3. Run the development server:
```bash
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Usage

```tsx
import StepNavigation from "@/components/StepNavigation";
import { IStep } from "@/types";

// Define your steps
const steps: IStep[] = [
  { id: "step1", title: "Step 1", isActive: true },
  { id: "step2", title: "Step 2", isActive: false },
];

// Use the component
<StepNavigation
  steps={steps}
  onSelectStep={(id) => {}}
  onSetStepAsFirst={(id) => {}}
  onRenameStep={(id, title) => {}}
  onCopyStep={(id) => {}}
  onDuplicateStep={(id) => {}}
  onDeleteStep={(id) => {}}
  onAddPage={() => {}}
  onReorderSteps={(newSteps) => {}}
  onAddBetween={(index) => {}}
/>
```

## Props

| Prop | Type | Description |
|------|------|-------------|
| steps | IStep[] | Array of step objects |
| onSelectStep | (id: string) => void | Called when a step is clicked |
| onSetStepAsFirst | (id: string) => void | Called when setting a step as first |
| onRenameStep | (id: string, title: string) => void | Called when renaming a step |
| onCopyStep | (id: string) => void | Called when copying a step |
| onDuplicateStep | (id: string) => void | Called when duplicating a step |
| onDeleteStep | (id: string) => void | Called when deleting a step |
| onAddPage | () => void | Called when adding a new page |
| onReorderSteps | (steps: IStep[]) => void | Called after drag and drop reordering |
| onAddBetween | (index: number) => void | Called when adding a step between existing ones |

## Technologies

- [Next.js](https://nextjs.org/) - React framework
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [@hello-pangea/dnd](https://github.com/hello-pangea/dnd) - Drag and drop functionality
- [Lucide React](https://lucide.dev/) - Icons
- [Framer Motion](https://www.framer.com/motion/) - Animations

## Development

- Run development server: `pnpm dev`
- Build for production: `pnpm build`
- Run production build: `pnpm start`
- Run linter: `pnpm lint`

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
