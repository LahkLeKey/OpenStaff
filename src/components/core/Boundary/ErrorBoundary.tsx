/**
 * MIT License
 * Copyright (c) 2025 OpenStaff
 * Source: https://github.com/LahkLeKey/OpenStaff
 */

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { AlertCircle } from "lucide-react";
import React, { type ReactNode } from "react";
import StackTrace, { type StackFrame } from "stacktrace-js";

interface State {
  hasError: boolean;
  error?: Error;
  frames?: StackFrame[];
  isMapping: boolean;
  showNodeModules: boolean;
  filterText: string;
}

export class ErrorBoundary extends React.Component<{ children: ReactNode }, State> {
  state: State = {
    hasError: false,
    isMapping: false,
    showNodeModules: false,
    filterText: "",
  };

  static getDerivedStateFromError(error: Error): Partial<State> {
    return { hasError: true, error };
  }

  async componentDidCatch(error: Error): Promise<void> {
    this.setState({ isMapping: true });
    try {
      const frames = await StackTrace.fromError(error, { offline: false });
      this.setState({ frames });
    } catch (e) {
      console.warn("StackTrace mapping failed:", e);
    } finally {
      this.setState({ isMapping: false });
    }
  }

  reset = (): void => {
    this.setState({
      hasError: false,
      error: undefined,
      frames: undefined,
      filterText: "",
      showNodeModules: false,
    });
    window.location.reload();
  };

  copy = (): void => {
    const lines = this.getDisplayLines();
    navigator.clipboard.writeText(lines.join("\n"));
  };

  toggleNodeModules = (checked: boolean): void => {
    this.setState({ showNodeModules: checked });
  };

  onFilterChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    this.setState({ filterText: e.target.value });
  };

  private formatFrames(): string[] {
    const { frames, error } = this.state;
    if (!frames?.length) {
      return error?.stack?.split("\n") || [];
    }
    return frames.map(
      (f, i) =>
        `${i}: ${f.functionName || "<anonymous>"} @ ${(f.fileName ?? "unknown file").replace(/\\/g, "/")}:${f.lineNumber}:${f.columnNumber}`,
    );
  }

  private getAppLines(): string[] {
    const { filterText } = this.state;
    return this.formatFrames().filter(
      (line) => !line.includes("node_modules") && line.includes(filterText),
    );
  }

  private getExternalLines(): string[] {
    const { showNodeModules, filterText } = this.state;
    if (!showNodeModules) return [];
    return this.formatFrames().filter(
      (line) => line.includes("node_modules") && line.includes(filterText),
    );
  }

  private getDisplayLines(): string[] {
    const app = this.getAppLines();
    const ext = this.getExternalLines();
    return this.state.showNodeModules ? [...app, "--- External Modules ---", ...ext] : app;
  }

  render() {
    if (!this.state.hasError) return this.props.children;
    const { error, isMapping, showNodeModules, filterText } = this.state;
    const lines = this.getDisplayLines();

    return (
      <Card className="m-6">
        <CardHeader>
          <div className="flex items-center gap-2">
            <AlertCircle className="h-6 w-6 text-destructive" />
            <CardTitle>Dev Sandbox Error</CardTitle>
          </div>
          <CardDescription>{error?.message || "An error occurred."}</CardDescription>
        </CardHeader>
        <Separator />
        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center space-x-2">
              <Checkbox checked={showNodeModules} onCheckedChange={this.toggleNodeModules} />
              <Label>Include node_modules</Label>
            </div>
            <Input
              placeholder="Filter frames"
              value={filterText}
              onChange={this.onFilterChange}
              className="flex-1 min-w-[150px]"
            />
            <Button size="sm" onClick={this.copy} disabled={isMapping}>
              Copy
            </Button>
          </div>

          <ScrollArea className="rounded border h-48">
            <div className="space-y-1 p-2">
              {lines.map((ln) => (
                <div key={ln} className="w-full text-left font-mono text-xs whitespace-pre-wrap">
                  {ln}
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button variant="outline" onClick={this.reset}>
            Reload
          </Button>
        </CardFooter>
      </Card>
    );
  }
}
