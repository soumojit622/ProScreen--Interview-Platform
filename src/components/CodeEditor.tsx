import { CODING_QUESTIONS, LANGUAGES } from "@/constants";
import { useState } from "react";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "./ui/resizable";
import { ScrollArea, ScrollBar } from "./ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { AlertCircleIcon, BookIcon, LightbulbIcon } from "lucide-react";
import Editor from "@monaco-editor/react";

function CodeEditor() {
  const [language, setLanguage] = useState<
    "javascript" | "python" | "java" | "c" | "cpp"
  >(LANGUAGES[0].id);
  const [selectedQuestion, setSelectedQuestion] = useState(CODING_QUESTIONS[0]);
  const [code, setCode] = useState(selectedQuestion.starterCode[language]);

  const handleQuestionChange = (questionId: string) => {
    const question = CODING_QUESTIONS.find((q) => q.id === questionId)!;
    setSelectedQuestion(question);
    setCode(question.starterCode[language]);
  };

  const handleLanguageChange = (
    newLanguage: "javascript" | "python" | "java" | "c" | "cpp"
  ) => {
    setLanguage(newLanguage);
    setCode(selectedQuestion.starterCode[newLanguage]);
  };

  return (
    <ResizablePanelGroup
      direction="vertical"
      className="min-h-[calc(100vh-4rem-1px)] bg-background"
    >
      {/* Question Section */}
      <ResizablePanel>
        <ScrollArea className="h-full">
          <div className="p-6">
            <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <h2 className="text-3xl font-bold tracking-tight text-primary">
                      {selectedQuestion.title}
                    </h2>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Select a language and solve the problem.
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <Select
                    value={selectedQuestion.id}
                    onValueChange={handleQuestionChange}
                  >
                    <SelectTrigger className="w-[200px] border shadow-md hover:shadow-lg">
                      <SelectValue placeholder="Select question" />
                    </SelectTrigger>
                    <SelectContent>
                      {CODING_QUESTIONS.map((q) => (
                        <SelectItem key={q.id} value={q.id}>
                          {q.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select value={language} onValueChange={handleLanguageChange}>
                    <SelectTrigger className="w-[160px] border shadow-md hover:shadow-lg">
                      <SelectValue>
                        <div className="flex items-center gap-2">
                          <img
                            src={`/${language}.png`}
                            alt={language}
                            className="w-6 h-6 object-contain"
                          />
                          {LANGUAGES.find((l) => l.id === language)?.name}
                        </div>
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      {LANGUAGES.map((lang) => (
                        <SelectItem key={lang.id} value={lang.id}>
                          <div className="flex items-center gap-2">
                            <img
                              src={`/${lang.id}.png`}
                              alt={lang.name}
                              className="w-6 h-6 object-contain"
                            />
                            {lang.name}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Problem Description */}
              <Card className="shadow-lg hover:shadow-xl transition">
                <CardHeader className="flex flex-row items-center gap-2">
                  <BookIcon className="h-6 w-6 text-primary" />
                  <CardTitle className="text-xl">Problem Description</CardTitle>
                </CardHeader>
                <CardContent className="text-sm leading-relaxed text-muted-foreground">
                  <div className="prose prose-sm dark:prose-invert max-w-none">
                    <p className="whitespace-pre-line">
                      {selectedQuestion.description}
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Problem Examples */}
              <Card className="shadow-lg hover:shadow-xl transition">
                <CardHeader className="flex flex-row items-center gap-2">
                  <LightbulbIcon className="h-6 w-6 text-yellow-500" />
                  <CardTitle className="text-xl">Examples</CardTitle>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-full w-full rounded-md border">
                    <div className="p-4 space-y-4">
                      {selectedQuestion.examples.map((example, index) => (
                        <div key={index} className="space-y-2">
                          <p className="font-medium text-sm">
                            Example {index + 1}:
                          </p>
                          <ScrollArea className="h-full w-full rounded-md">
                            <pre className="bg-muted/50 p-4 rounded-lg text-sm font-mono shadow-inner">
                              <div>Input: {example.input}</div>
                              <div>Output: {example.output}</div>
                              {example.explanation && (
                                <div className="pt-2 text-muted-foreground">
                                  Explanation: {example.explanation}
                                </div>
                              )}
                            </pre>
                            <ScrollBar orientation="horizontal" />
                          </ScrollArea>
                        </div>
                      ))}
                    </div>
                    <ScrollBar />
                  </ScrollArea>
                </CardContent>
              </Card>

              {/* Constraints */}
              {selectedQuestion.constraints && (
                <Card className="shadow-lg hover:shadow-xl transition">
                  <CardHeader className="flex flex-row items-center gap-2">
                    <AlertCircleIcon className="h-6 w-6 text-blue-500" />
                    <CardTitle className="text-xl">Constraints</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="list-disc list-inside space-y-1.5 text-sm marker:text-muted-foreground">
                      {selectedQuestion.constraints.map((constraint, index) => (
                        <li key={index} className="text-muted-foreground">
                          {constraint}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
          <ScrollBar />
        </ScrollArea>
      </ResizablePanel>

      <ResizableHandle withHandle />

      {/* Code Editor */}
      <ResizablePanel defaultSize={60} maxSize={100}>
        <div className="h-full relative bg-editor-gradient rounded-t-lg overflow-hidden">
          <Editor
            height={"100%"}
            defaultLanguage={language}
            language={language}
            theme="vs-dark"
            value={code}
            onChange={(value) => setCode(value || "")}
            options={{
              minimap: { enabled: false },
              fontSize: 16,
              lineNumbers: "on",
              scrollBeyondLastLine: false,
              automaticLayout: true,
              padding: { top: 16, bottom: 16 },
              wordWrap: "on",
              wrappingIndent: "indent",
            }}
          />
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}

export default CodeEditor;
