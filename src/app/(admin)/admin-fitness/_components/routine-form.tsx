"use client";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { routineSchema, type RoutineFormValues } from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, Trash2 } from "lucide-react";
import { useFieldArray, useForm } from "react-hook-form";
import { toast } from "sonner";

export default function RoutineForm({
  initialData,
  id,
}: {
  initialData?: RoutineFormValues;
  id: number;
}) {
  return <></>;
}
