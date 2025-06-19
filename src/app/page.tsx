"use client";

import StepNavigation from "@/components/StepNavigation";
import { IStep } from "@/types";
import { useState } from "react";

export default function Home() {
  const [steps, setSteps] = useState<IStep[]>([
    { id: "info", title: "Info", isActive: true },
    { id: "details", title: "Details", isActive: false },
    { id: "others", title: "Others", isActive: false },
    { id: "ending", title: "Ending", isActive: false },
  ]);

  const onSelectStep = (stepId: string) => {
    setSteps(steps.map((step) => ({
      ...step,
      isActive: step.id === stepId,
    })));
  };

  const onSetStepAsFirst = (stepId: string) => {
    const stepIndex = steps.findIndex((step) => step.id === stepId);
    if (stepIndex > 0) {
      const newSteps = [...steps];
      const [step] = newSteps.splice(stepIndex, 1);
      newSteps.unshift(step);
      setSteps(newSteps);
    }
  };

  const onRenameStep = (stepId: string, newTitle: string) => {
    setSteps(steps.map((step) => ({
      ...step,
      title: step.id === stepId ? newTitle : step.title,
    })));
  };

  const onCopyStep = (stepId: string) => {
    const stepToCopy = steps.find((step) => step.id === stepId);
    if (stepToCopy) {
      setSteps([...steps, {
        ...stepToCopy,
        id: `${stepToCopy.id}-copy-${Date.now()}`,
        isActive: false,
      }]);
    }
  };

  const onDuplicateStep = (stepId: string) => {
    const stepIndex = steps.findIndex((step) => step.id === stepId);
    const stepToDuplicate = steps[stepIndex];
    if (stepToDuplicate) {
      const newSteps = [...steps];
      newSteps.splice(stepIndex + 1, 0, {
        ...stepToDuplicate,
        id: `${stepToDuplicate.id}-duplicate-${Date.now()}`,
        isActive: false,
      });
      setSteps(newSteps);
    }
  };

  const onDeleteStep = (stepId: string) => {
    const stepIndex = steps.findIndex((step) => step.id === stepId);
    if (stepIndex !== -1) {
      const newSteps = steps.filter((step) => step.id !== stepId);
      if (steps[stepIndex].isActive && newSteps.length > 0) {
        const nextActiveIndex = Math.min(stepIndex, newSteps.length - 1);
        newSteps[nextActiveIndex].isActive = true;
      }
      setSteps(newSteps);
    }
  };

  const onAddPage = () => {
    setSteps([...steps, {
      id: `step-${steps.length + 1}`,
      title: `Step ${steps.length + 1}`,
      isActive: false,
    }]);
  };

  const onAddBetween = (index: number) => {
    setSteps([
      ...steps.slice(0, index),
      {
        id: `step-${Date.now()}`,
        title: `Step ${steps.length + 1}`,
        isActive: false,
      },
      ...steps.slice(index),
    ]);
  };

  return (
    <div className="flex flex-col h-screen p-7 justify-center gap-4">
      <div className="flex-1 bg-[#1B2332] p-4 rounded-xl" />
        <StepNavigation
          steps={steps}
          onSelectStep={onSelectStep}
          onSetStepAsFirst={onSetStepAsFirst}
          onRenameStep={onRenameStep}
          onCopyStep={onCopyStep}
          onDuplicateStep={onDuplicateStep}
          onDeleteStep={onDeleteStep}
          onReorderSteps={setSteps}
          onAddPage={onAddPage}
          onAddBetween={onAddBetween}
        />
    </div>
  );
}
