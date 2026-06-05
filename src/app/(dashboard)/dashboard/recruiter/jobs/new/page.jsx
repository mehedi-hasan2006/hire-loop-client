"use client";

import React, { useState } from "react";
import {
  Form,
  Fieldset,
  TextField,
  Label,
  Input,
  TextArea,
  FieldError,
  Select,
  ListBox,
  Switch,
  Button,
} from "@heroui/react";
import { Briefcase, Globe } from "@gravity-ui/icons";

export default function PostJobPage() {
  const [mockCompany] = useState({
    name: "Acme Corp",
    id: "company_123",
    isApproved: true,
  });

  const [isRemote, setIsRemote] = useState(false);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!mockCompany.isApproved) {
      alert("Your company profile must be approved before you can post jobs.");
      return;
    }

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    const newErrors = {};
    if (!data.jobTitle) newErrors.jobTitle = "Job title is required";
    if (!data.jobCategory) newErrors.jobCategory = "Job category is required";
    if (!data.jobType) newErrors.jobType = "Job type is required";
    if (!data.minSalary) newErrors.minSalary = "Minimum salary is required";
    if (!data.maxSalary) newErrors.maxSalary = "Maximum salary is required";
    if (!isRemote && !data.location)
      newErrors.location = "Location is required for non-remote roles";
    if (!data.deadline) newErrors.deadline = "Application deadline is required";
    if (!data.responsibilities)
      newErrors.responsibilities = "Responsibilities are required";
    if (!data.requirements)
      newErrors.requirements = "Requirements are required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    const payload = {
      ...data,
      isRemote,
      companyId: mockCompany.id,
      status: "active",
      isPubliclyVisible: true,
    };

    console.log(payload);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      console.log("Payload:", payload);
    }, 1500);
  };

  // Unified input styling
  const inputBaseClass = [
    "w-full",
    "bg-zinc-900/50",
    "border border-zinc-800",
    "hover:border-zinc-700",
    "focus:border-zinc-600 focus:ring-2 focus:ring-zinc-600/20",
    "rounded-xl",
    "h-13 min-h-[52px]",
    "px-4",
    "text-sm text-white",
    "placeholder:text-zinc-600",
    "outline-none",
    "transition-all duration-200",
  ].join(" ");

  const textAreaBaseClass = [
    "w-full",
    "bg-zinc-900/50",
    "border border-zinc-800",
    "hover:border-zinc-700",
    "focus:border-zinc-600 focus:ring-2 focus:ring-zinc-600/20",
    "rounded-xl",
    "p-4",
    "text-sm text-white",
    "placeholder:text-zinc-600",
    "outline-none",
    "transition-all duration-200",
    "resize-none",
  ].join(" ");

  const selectTriggerClass = [
    "w-full flex items-center justify-between",
    "bg-zinc-900/50",
    "border border-zinc-800",
    "hover:border-zinc-700",
    "h-13 min-h-[52px]",
    "rounded-xl",
    "px-4",
    "text-white",
    "transition-all duration-200",
    "text-sm",
    "outline-none",
    "data-[focused=true]:border-zinc-600 data-[focused=true]:ring-2 data-[focused=true]:ring-zinc-600/20",
    "data-[invalid=true]:border-red-500/50 data-[invalid=true]:ring-red-500/20",
  ].join(" ");

  const popoverClass = [
    "bg-zinc-900",
    "border border-zinc-800",
    "text-white",
    "rounded-xl",
    "shadow-2xl shadow-black/50",
    "p-2",
    "mt-2",
  ].join(" ");

  const listItemClass = [
    "flex items-center justify-between",
    "px-3 py-2.5",
    "rounded-lg",
    "hover:bg-zinc-800",
    "cursor-pointer",
    "text-sm text-zinc-300",
    "transition-colors duration-150",
    "outline-none",
    "data-[focused=true]:bg-zinc-800 data-[focused=true]:text-white",
    "data-[selected=true]:bg-zinc-800 data-[selected=true]:text-white",
  ].join(" ");

  return (
    <div className="min-h-screen bg-zinc-950 text-white py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Main Card */}
        <div className="bg-zinc-900/30 border border-zinc-800/50 rounded-2xl p-6 sm:p-8 backdrop-blur-sm shadow-2xl shadow-black/20">
          {/* Header */}
          <div className="mb-8 md:flex justify-between ">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-2xl bg-linear-to-br from-violet-500 to-purple-600 flex items-center justify-center shadow-lg shadow-violet-500/20">
                <Briefcase className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold tracking-tight bg-linear-to-r from-white to-zinc-300 bg-clip-text text-transparent">
                  Create Job Posting
                </h1>
                <p className="text-sm text-zinc-500 mt-1">
                  Fill in the details to publish your open position
                </p>
              </div>
            </div>
            {/* Company Badge */}
            <div className="">
              <div className="inline-flex items-center gap-3 bg-zinc-900/70 border border-zinc-800/50 rounded-2xl px-4 py-3 backdrop-blur-sm  w-full md:w-auto">
                <div className="w-9 h-9 rounded-xl bg-zinc-800 border border-zinc-700 flex items-center justify-center text-xs font-bold text-zinc-300 shadow-inner">
                  {mockCompany.name.substring(0, 2).toUpperCase()}
                </div>
                <div>
                  <p className="text-xs text-zinc-500 font-medium">
                    Posting as
                  </p>
                  <p className="text-sm font-semibold text-zinc-200">
                    {mockCompany.name}
                  </p>
                </div>
                <div className="ml-2 flex items-center gap-1.5 bg-emerald-950/30 border border-emerald-900/30 text-emerald-400 text-xs font-medium px-2.5 py-1 rounded-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                  Verified
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <Form
            onSubmit={handleSubmit}
            className="space-y-8"
            validationErrors={errors}
            validationBehavior="aria"
          >
            {/* SECTION 1: Job Information */}
            <Fieldset className="space-y-6">
              <legend className="flex items-center gap-3 text-base font-semibold text-zinc-300 w-full pb-4 mb-2 border-b border-zinc-800/50">
                <span className="w-8 h-8 rounded-lg bg-zinc-800 flex items-center justify-center">
                  <span className="text-zinc-400 text-sm">01</span>
                </span>
                Job Information
              </legend>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Job Title */}
                <TextField
                  name="jobTitle"
                  isInvalid={!!errors.jobTitle}
                  className="flex flex-col gap-2 md:col-span-2"
                >
                  <Label className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">
                    Job Title <span className="text-red-400">*</span>
                  </Label>
                  <Input
                    placeholder="e.g. Senior Frontend Engineer"
                    className={inputBaseClass}
                  />
                  {errors.jobTitle && (
                    <FieldError className="text-xs text-red-400 flex items-center gap-1.5 mt-1">
                      <span className="inline-block w-1 h-1 rounded-full bg-red-400"></span>
                      {errors.jobTitle}
                    </FieldError>
                  )}
                </TextField>

                {/* Job Category */}
                <Select
                  className="w-full"
                  name="jobCategory"
                  isInvalid={!!errors.jobCategory}
                >
                  <Label className="text-xs font-semibold text-zinc-500 uppercase tracking-wider block mb-2">
                    Category <span className="text-red-400">*</span>
                  </Label>
                  <Select.Trigger className={selectTriggerClass}>
                    <Select.Value className="text-white placeholder:text-zinc-600" />
                    <Select.Indicator className="text-zinc-500" />
                  </Select.Trigger>
                  {errors.jobCategory && (
                    <span className="text-xs text-red-400 flex items-center gap-1.5 mt-1.5">
                      <span className="inline-block w-1 h-1 rounded-full bg-red-400"></span>
                      {errors.jobCategory}
                    </span>
                  )}
                  <Select.Popover className={popoverClass}>
                    <ListBox className="outline-none">
                      {[
                        { id: "technology", name: "Technology" },
                        { id: "design", name: "Design" },
                        { id: "marketing", name: "Marketing" },
                        { id: "management", name: "Management" },
                        { id: "sales", name: "Sales" },
                      ].map((item) => (
                        <ListBox.Item
                          key={item.id}
                          id={item.id}
                          className={listItemClass}
                          textValue={item.name}
                        >
                          {item.name}
                        </ListBox.Item>
                      ))}
                    </ListBox>
                  </Select.Popover>
                </Select>

                {/* Job Type */}
                <Select
                  className="w-full"
                  name="jobType"
                  isInvalid={!!errors.jobType}
                >
                  <Label className="text-xs font-semibold text-zinc-500 uppercase tracking-wider block mb-2">
                    Job Type <span className="text-red-400">*</span>
                  </Label>
                  <Select.Trigger className={selectTriggerClass}>
                    <Select.Value className="text-white placeholder:text-zinc-600" />
                    <Select.Indicator className="text-zinc-500" />
                  </Select.Trigger>
                  {errors.jobType && (
                    <span className="text-xs text-red-400 flex items-center gap-1.5 mt-1.5">
                      <span className="inline-block w-1 h-1 rounded-full bg-red-400"></span>
                      {errors.jobType}
                    </span>
                  )}
                  <Select.Popover className={popoverClass}>
                    <ListBox className="outline-none">
                      {[
                        { id: "full-time", name: "Full-time" },
                        { id: "part-time", name: "Part-time" },
                        { id: "contract", name: "Contract" },
                        { id: "internship", name: "Internship" },
                      ].map((item) => (
                        <ListBox.Item
                          key={item.id}
                          id={item.id}
                          className={listItemClass}
                          textValue={item.name}
                        >
                          {item.name}
                        </ListBox.Item>
                      ))}
                    </ListBox>
                  </Select.Popover>
                </Select>
              </div>

              {/* Salary Range */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div className="md:col-span-2 space-y-2">
                  <Label className="text-xs font-semibold text-zinc-500 uppercase tracking-wider block">
                    Salary Range <span className="text-red-400">*</span>
                  </Label>
                  <div className="grid grid-cols-2 gap-3">
                    <TextField name="minSalary" isInvalid={!!errors.minSalary}>
                      <Input
                        placeholder="Min salary"
                        type="number"
                        className={inputBaseClass}
                      />
                      {errors.minSalary && (
                        <FieldError className="text-xs text-red-400 mt-1">
                          {errors.minSalary}
                        </FieldError>
                      )}
                    </TextField>
                    <TextField name="maxSalary" isInvalid={!!errors.maxSalary}>
                      <Input
                        placeholder="Max salary"
                        type="number"
                        className={inputBaseClass}
                      />
                      {errors.maxSalary && (
                        <FieldError className="text-xs text-red-400 mt-1">
                          {errors.maxSalary}
                        </FieldError>
                      )}
                    </TextField>
                  </div>
                </div>

                {/* Currency */}
                <Select
                  className="w-full mt-auto"
                  name="currency"
                  defaultSelectedKeys={["USD"]}
                >
                  <Label className="text-xs font-semibold text-zinc-500 uppercase tracking-wider block mb-2">
                    Currency
                  </Label>
                  <Select.Trigger className={selectTriggerClass}>
                    <Select.Value className="text-white" />
                    <Select.Indicator className="text-zinc-500" />
                  </Select.Trigger>
                  <Select.Popover className={popoverClass}>
                    <ListBox className="outline-none">
                      {[
                        { id: "USD", name: "USD ($)" },
                        { id: "BDT", name: "BDT (৳)" },
                        { id: "EUR", name: "EUR (€)" },
                        { id: "GBP", name: "GBP (£)" },
                      ].map((item) => (
                        <ListBox.Item
                          key={item.id}
                          id={item.id}
                          className={listItemClass}
                          textValue={item.name}
                        >
                          {item.name}
                        </ListBox.Item>
                      ))}
                    </ListBox>
                  </Select.Popover>
                </Select>
              </div>

              {/* Location & Deadline */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Location */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">
                      Location{" "}
                      {!isRemote && <span className="text-red-400">*</span>}
                    </Label>
                    <Switch
                      isSelected={isRemote}
                      onChange={setIsRemote}
                      size="sm"
                    >
                      <Switch.Control className="bg-zinc-800 data-[selected=true]:bg-violet-500">
                        <Switch.Thumb className="bg-zinc-400 data-[selected=true]:bg-white" />
                      </Switch.Control>
                      <Switch.Content>
                        <Label className="text-xs text-zinc-500 font-medium ml-2">
                          Remote
                        </Label>
                      </Switch.Content>
                    </Switch>
                  </div>
                  <TextField
                    name="location"
                    isInvalid={!isRemote && !!errors.location}
                  >
                    <div className="relative">
                      <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600 pointer-events-none z-10" />
                      <Input
                        placeholder={
                          isRemote ? "Global / Remote" : "e.g. New York, NY"
                        }
                        disabled={isRemote}
                        className={`${inputBaseClass} pl-11 disabled:opacity-50 disabled:cursor-not-allowed`}
                      />
                    </div>
                    {!isRemote && errors.location && (
                      <FieldError className="text-xs text-red-400 mt-1.5">
                        {errors.location}
                      </FieldError>
                    )}
                  </TextField>
                </div>

                {/* Deadline */}
                <TextField
                  name="deadline"
                  isInvalid={!!errors.deadline}
                  className="flex flex-col gap-2"
                >
                  <Label className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">
                    Deadline <span className="text-red-400">*</span>
                  </Label>
                  <Input
                    type="date"
                    className={`${inputBaseClass} scheme-dark`}
                  />
                  {errors.deadline && (
                    <FieldError className="text-xs text-red-400 mt-1">
                      {errors.deadline}
                    </FieldError>
                  )}
                </TextField>
              </div>
            </Fieldset>

            {/* SECTION 2: Job Description */}
            <Fieldset className="space-y-6">
              <legend className="flex items-center gap-3 text-base font-semibold text-zinc-300 w-full pb-4 mb-2 border-b border-zinc-800/50">
                <span className="w-8 h-8 rounded-lg bg-zinc-800 flex items-center justify-center">
                  <span className="text-zinc-400 text-sm">02</span>
                </span>
                Job Details & Description
              </legend>

              {/* Responsibilities */}
              <TextField
                name="responsibilities"
                isInvalid={!!errors.responsibilities}
                className="flex flex-col gap-2"
              >
                <Label className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">
                  Responsibilities <span className="text-red-400">*</span>
                </Label>
                <TextArea
                  placeholder="Describe the key responsibilities and daily tasks for this role..."
                  rows={5}
                  className={`${textAreaBaseClass} min-h-35`}
                />
                {errors.responsibilities && (
                  <FieldError className="text-xs text-red-400 mt-1">
                    {errors.responsibilities}
                  </FieldError>
                )}
              </TextField>

              {/* Requirements */}
              <TextField
                name="requirements"
                isInvalid={!!errors.requirements}
                className="flex flex-col gap-2"
              >
                <Label className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">
                  Requirements <span className="text-red-400">*</span>
                </Label>
                <TextArea
                  placeholder="List the required skills, qualifications, and experience..."
                  rows={5}
                  className={`${textAreaBaseClass} min-h-35`}
                />
                {errors.requirements && (
                  <FieldError className="text-xs text-red-400 mt-1">
                    {errors.requirements}
                  </FieldError>
                )}
              </TextField>

              {/* Benefits */}
              <TextField name="benefits" className="flex flex-col gap-2">
                <Label className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">
                  Benefits{" "}
                  <span className="text-zinc-600 font-normal lowercase tracking-normal">
                    — Optional
                  </span>
                </Label>
                <TextArea
                  placeholder="Describe the perks, benefits, and compensation package..."
                  rows={4}
                  className={`${textAreaBaseClass} min-h-30`}
                />
              </TextField>
            </Fieldset>

            {/* Action Buttons */}
            <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 pt-6 border-t border-zinc-800/50">
              <Button
                type="button"
                variant="bordered"
                className="border-zinc-800 text-zinc-400 hover:bg-zinc-900 hover:text-white hover:border-zinc-700 rounded-xl px-6 py-2.5 font-medium text-sm transition-all duration-200 h-13 min-h-13"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="bg-linear-to-r from-violet-500 to-purple-600 text-white hover:from-violet-400 hover:to-purple-500 font-semibold rounded-xl px-8 py-2.5 shadow-lg shadow-violet-500/25 transition-all duration-200 h-13 min-h-13 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                        fill="none"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Publishing...
                  </span>
                ) : (
                  "Publish Job Post"
                )}
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
}
