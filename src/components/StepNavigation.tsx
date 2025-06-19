"use client";

import { FC, useState } from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "@hello-pangea/dnd";
import Step from "./Step";
import AddPage from "./AddPage";
import StepConnector from "./StepConnector";
import { IStep } from "@/types";

interface StepNavigationProps {
  steps: IStep[];
  onSelectStep: (stepId: string) => void;
  onSetStepAsFirst: (stepId: string) => void;
  onRenameStep: (stepId: string, newTitle: string) => void;
  onCopyStep: (stepId: string) => void;
  onDuplicateStep: (stepId: string) => void;
  onDeleteStep: (stepId: string) => void;
  onAddPage: () => void;
  onReorderSteps: (steps: IStep[]) => void;
  onAddBetween?: (index: number) => void;
}

const StepNavigation: FC<StepNavigationProps> = ({
  steps,
  onSelectStep,
  onSetStepAsFirst,
  onRenameStep,
  onCopyStep,
  onDuplicateStep,
  onDeleteStep,
  onAddPage,
  onReorderSteps,
  onAddBetween,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    const items = Array.from(steps);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    onReorderSteps(items);
  };

  const handleDragStart = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="w-full">
      <DragDropContext onDragEnd={handleDragEnd} onDragStart={handleDragStart}>
        <div className="flex items-center h-12 px-4">
          <Droppable droppableId="steps" direction="horizontal">
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className={`flex items-center gap-0 flex-1 ${
                  snapshot.isDraggingOver ? "bg-gray-50" : ""
                }`}
              >
                {steps.map((step, index) => (
                  <div
                    key={step.id + "-with-connector"}
                    className="flex items-center"
                  >
                    <Draggable
                      key={step.id}
                      draggableId={step.id}
                      index={index}
                      isDragDisabled={isMenuOpen}
                    >
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          style={{
                            ...provided.draggableProps.style,
                            cursor: isMenuOpen
                              ? "default"
                              : snapshot.isDragging
                              ? "grabbing"
                              : "grab",
                          }}
                          className={`transition-shadow duration-200 ${
                            snapshot.isDragging
                              ? "shadow-lg rounded-lg z-50"
                              : ""
                          }`}
                        >
                          <Step
                            title={step.title}
                            isActive={step.isActive}
                            onClick={() => onSelectStep(step.id)}
                            onSetAsFirst={() => onSetStepAsFirst(step.id)}
                            onRename={() => {
                              const newTitle = prompt(
                                "Enter new title:",
                                step.title
                              );
                              if (newTitle) onRenameStep(step.id, newTitle);
                            }}
                            onCopy={() => onCopyStep(step.id)}
                            onDuplicate={() => onDuplicateStep(step.id)}
                            onDelete={() => onDeleteStep(step.id)}
                            onMenuChange={setIsMenuOpen}
                          />
                        </div>
                      )}
                    </Draggable>
                    {index < steps.length - 1 && (
                      <StepConnector
                        onAddBetween={() =>
                          onAddBetween && onAddBetween(index + 1)
                        }
                      />
                    )}
                  </div>
                ))}
                {steps.length > 0 && (
                  <StepConnector
                    onAddBetween={() =>
                      onAddBetween && onAddBetween(steps.length)
                    }
                  />
                )}
                <div key="add-page-step" className="flex items-center">
                  <Draggable
                    key="add-page"
                    draggableId="add-page"
                    index={steps.length}
                    isDragDisabled={true}
                  >
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={{
                          ...provided.draggableProps.style,
                          cursor: "default",
                        }}
                      >
                        <AddPage onClick={onAddPage} />
                      </div>
                    )}
                  </Draggable>
                </div>
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
      </DragDropContext>
    </nav>
  );
};

export default StepNavigation;
