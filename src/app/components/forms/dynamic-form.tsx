"use client";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check, ChevronsUpDown, Eye, EyeOff } from "lucide-react";
import { use, useEffect, useState } from "react";
import { Path, PathValue, useForm, UseFormReturn } from "react-hook-form";
import { custom, z } from "zod";
import { Spinner } from "../loader/spinner";
import { Checkbox } from "@/components/ui/checkbox";

// ---------------------------
// Types
// ---------------------------
type SelectData = {
  label: string;
  name: string;
};

type FieldType<T extends z.ZodType<any, any>> = {
  name: Path<z.infer<T>>;
  label: string;
  type: "text" | "password" | "email" | "number" | "select" | "checkbox";
  placeholder?: string;
  select?: {
    selectData: SelectData[] | undefined;
    selectLabel: string;
    setSelectValue: React.Dispatch<React.SetStateAction<string>>;
    selectValue: string;
    prelativeField?: Path<z.infer<T>>;
    prelativeLabel?: string;
  };
  onValueChange?: (value: string) => void;
};

interface DynamicFormProps<T extends z.ZodType<any, any>> {
  formStyle?: string;
  buttonStyle?: string;
  buttonLabel?: string;
  fieldStyle?: string;
  labelStyle?: string;
  inputStyle?: string;
  messageStyle?: string;
  customErrorMessage?: {
    message: string;
    error: boolean
    field: string
  };
  schema: T;
  defaultValues: z.infer<T>;
  fields: FieldType<T>[];
  onSubmit: (values: z.infer<T>) => void;
  isLoading: boolean;
  isDisabled: boolean
}

// ---------------------------
// Subcomponent per field
// ---------------------------
function DynamicField<T extends z.ZodType<any, any>>({
  field,
  form,
  fieldStyle,
  labelStyle,
  inputStyle,
  messageStyle,
  isLoading = false,
  placeholder,
}: {
  field: FieldType<T>;
  form: UseFormReturn<z.infer<T>>;
  fieldStyle?: string;
  labelStyle?: string;
  inputStyle?: string;
  messageStyle?: string;
  isLoading?: boolean;
  placeholder?: string;
}) {
  const [open, setOpen] = useState(false);
  const [viewPassword, setViewPassword] = useState(false);
  const prelativeValue = field.select?.prelativeField
    ? form.watch(field.select.prelativeField)
    : null;
  const isDisabled = !!field.select?.prelativeField && !prelativeValue;

  return (
    <FormField
      control={form.control}
      name={field.name}
      render={({ field: controller }) => (
        <FormItem className={cn("flex flex-col", fieldStyle)}>
          <FormLabel className={cn(labelStyle)}>{field.label}</FormLabel>
          <FormControl>
            {field.type === "select" ? (
              field.select?.selectData && field.select.selectData.length > 0 ? (
                // --- caso select con datos ---
                <Popover open={open} onOpenChange={setOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={open}
                      className={cn(
                        "w-full text-muted-foreground justify-between",
                        form.formState.errors[field.name] &&
                        "border-destructive",
                      )}
                      disabled={isDisabled || isLoading}
                    >
                      <span>
                        {controller.value
                          ? `${field.select.selectData.find(
                            (sValue) => sValue.label === controller.value,
                          )?.label
                          } ${field.select.selectData
                            .find(
                              (sValue) => sValue.label === controller.value,
                            )
                            ?.name.slice(0, 1) === "-"
                            ? ""
                            : `${field.select.selectData.find(
                              (sValue) =>
                                sValue.label === controller.value,
                            )?.name
                            }`
                          }`
                          : isDisabled
                            ? `${field.select?.prelativeLabel ??
                            field.select?.prelativeField
                            } is required`
                            : `Select ${field.select?.selectLabel}...`}
                      </span>
                      <ChevronsUpDown className="opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="p-0" align="start">
                    <Command>
                      <CommandInput
                        placeholder={`Search ${field.select?.selectLabel}...`}
                        className="h-9"
                      />
                      <CommandList>
                        <CommandEmpty>
                          No {field.select?.selectLabel} found.
                        </CommandEmpty>
                        <CommandGroup>
                          {field.select.selectData.map((sValue) => (
                            <CommandItem
                              key={sValue.name}
                              value={sValue.label}
                              disabled={controller.value === sValue.label}
                              onSelect={(currentValue) => {
                                const newValue =
                                  currentValue === controller.value
                                    ? ""
                                    : currentValue;

                                controller.onChange(newValue);
                                field.select?.setSelectValue(newValue);
                                field.onValueChange?.(newValue);
                                setOpen(false);
                              }}
                            >
                              {`${sValue.label} ${sValue.name.slice(0, 1) !== "-"
                                ? `(${sValue.name})`
                                : ""
                                }`}
                              <Check
                                className={cn(
                                  "ml-auto",
                                  controller.value === sValue.label
                                    ? "opacity-100"
                                    : "opacity-0",
                                )}
                              />
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
              ) : (
                // --- caso select sin datos todavía ---
                <Button
                  variant="outline"
                  className="w-full justify-between text-muted-foreground"
                  disabled
                >
                  {isDisabled ? (
                    `${field.select?.prelativeLabel ??
                    field.select?.prelativeField
                    } is required`
                  ) : (
                    <Spinner />
                  )}
                </Button>
              )
            ) : field.type === "password" ? (
              // --- caso input password ---
              <div className="flex flex-row w-full items-center justify-center gap-2">
                <Input
                  className={cn(inputStyle)}
                  type={!viewPassword ? "password" : "text"}
                  placeholder={field.placeholder || field.label}
                  {...controller}
                  onChange={(e) => {
                    controller.onChange(e.target.value);
                    field.onValueChange?.(e.target.value);
                  }}
                  disabled={isDisabled || isLoading}
                />
                <Button
                  type="button"
                  variant={"outline"}
                  size={"icon"}
                  className="hover:cursor-pointer"
                  onClick={() => setViewPassword(!viewPassword)}
                >
                  {viewPassword ? <EyeOff /> : <Eye />}
                </Button>
              </div>
            ) : field.type === "checkbox" ? (
              // --- caso input checkbox ---
              <div className="flex flex-row w-fit items-center justify-center gap-2">
                <Checkbox
                  className={cn(
                    "text-muted-foreground",
                    form.formState.errors[field.name] && "border-destructive",
                  )}
                  checked={!!controller.value}
                  onCheckedChange={(checked: boolean) => {
                    controller.onChange(checked);
                    field.onValueChange?.(String(checked));
                  }}
                  disabled={isDisabled || isLoading}
                />
                <span className="text-sm text-muted-foreground">
                  {field.placeholder}
                </span>
              </div>
            ) : (
              // --- caso input normal ---
              <Input
                className={cn(inputStyle)}
                type={field.type}
                placeholder={field.placeholder || field.label}
                {...controller}
                onChange={(e) => {
                  controller.onChange(e.target.value);
                  field.onValueChange?.(e.target.value);
                }}
                disabled={isDisabled || isLoading}
              />
            )}
          </FormControl>

          <FormMessage className={cn(messageStyle)} />
        </FormItem>
      )}
    />
  );
}

// ---------------------------
// Component
// ---------------------------
export function ReusableForm<T extends z.ZodType<any, any>>({
  schema,
  defaultValues,
  fields,
  onSubmit,
  isLoading,
  formStyle,
  labelStyle,
  fieldStyle,
  inputStyle,
  buttonStyle,
  buttonLabel,
  messageStyle,
  customErrorMessage,
  isDisabled
}: DynamicFormProps<T>) {
  const form = useForm<z.infer<T>>({
    resolver: zodResolver(schema) as any,
    defaultValues,
  });

  // Reset dependents when parent changes
  useEffect(() => {
    const subscription = form.watch((values, { name }) => {
      fields.forEach((field) => {
        if (
          field.select?.prelativeField &&
          name === field.select.prelativeField
        ) {
          form.setValue(
            field.name,
            "" as PathValue<z.infer<T>, typeof field.name>,
          );
          field.select.setSelectValue("");
        }
      });
    });
    return () => subscription.unsubscribe();
  }, [fields, form]);

  useEffect(() => {
    if (customErrorMessage?.error && customErrorMessage.field) {
      form.setError(customErrorMessage.field as any, {
        type: "manual",
        message: customErrorMessage.message,
      });
    }
  }, [customErrorMessage, form]);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn("space-y-4", formStyle)}
      >
        {fields.map((field) => (
          <DynamicField
            key={field.name}
            field={field}
            form={form}
            fieldStyle={fieldStyle}
            labelStyle={labelStyle}
            inputStyle={inputStyle}
            messageStyle={messageStyle}
            isLoading={isLoading}
          />
        ))}
        <div className="flex w-full items-center gap-2 justify-start">
          <Button
            type="submit"
            className={cn("w-full", buttonStyle)}
            disabled={isLoading}
          >
            {buttonLabel || "Submit"} {isLoading && <Spinner />}
          </Button>
        </div>
      </form>
    </Form>
  );
}
