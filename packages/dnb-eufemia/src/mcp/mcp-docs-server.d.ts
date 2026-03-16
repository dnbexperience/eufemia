#!/usr/bin/env node
/**
 * Eufemia Docs MCP Server
 *
 * Entry points:
 * - docs/llm.md
 * - docs/uilib/.../*.md
 */
import { z } from 'zod';
import type { CallToolResult } from '@modelcontextprotocol/sdk/types';
type ToolResult = CallToolResult;
declare const EmptyInput: z.ZodObject<{}, z.core.$strip>;
declare const DocsReadInput: z.ZodObject<{
    path: z.ZodString;
}, z.core.$strip>;
declare const DocsSearchInput: z.ZodObject<{
    query: z.ZodAny;
    limit: z.ZodDefault<z.ZodNumber>;
    prefix: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
declare const DocsListInput: z.ZodObject<{
    prefix: z.ZodOptional<z.ZodString>;
    limit: z.ZodDefault<z.ZodNumber>;
}, z.core.$strip>;
declare const ComponentNameInput: z.ZodObject<{
    name: z.ZodString;
}, z.core.$strip>;
type DocsReadInputType = z.infer<typeof DocsReadInput>;
type DocsListInputType = z.infer<typeof DocsListInput>;
type DocsSearchInputType = z.infer<typeof DocsSearchInput>;
type ComponentNameInputType = z.infer<typeof ComponentNameInput>;
type EmptyInputType = z.infer<typeof EmptyInput>;
type DocsToolHandlers = {
    docsEntry: (_input: EmptyInputType) => Promise<ToolResult>;
    docsIndex: (_input: EmptyInputType) => Promise<ToolResult>;
    docsList: (input: DocsListInputType) => Promise<ToolResult>;
    docsRead: (input: DocsReadInputType) => Promise<ToolResult>;
    docsSearch: (input: DocsSearchInputType) => Promise<ToolResult>;
    componentFind: (input: ComponentNameInputType) => Promise<ToolResult>;
    componentDoc: (input: ComponentNameInputType) => Promise<ToolResult>;
    componentApi: (input: ComponentNameInputType) => Promise<ToolResult>;
    componentProps: (input: ComponentNameInputType) => Promise<ToolResult>;
    docsRoot: string;
};
export declare function createDocsTools(options?: {
    docsRoot?: string;
}): DocsToolHandlers;
export {};
