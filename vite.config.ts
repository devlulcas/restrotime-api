import { defineConfig } from 'vite';
import { VitePluginNode } from 'vite-plugin-node';

export default defineConfig({
	server: {
		port: 3000
	},
	resolve: {
		alias: {
			'@': '/src',
			'@database': '/src/database/index'
		}
	},
	plugins: [
		...VitePluginNode({
			adapter: 'express',
			appPath: './src/index.ts',
			exportName: 'devApp',
			tsCompiler: 'esbuild',
		})
	],
});
