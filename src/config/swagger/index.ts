import { OpenAPIV3 } from 'openapi-types';
import path from 'path';
import fs from 'fs';
import { mergeObjects } from '@/utils/mergeObjects';
import { _dirname } from '../paths/dirname';

type SwaggerDocument = () => Promise<OpenAPIV3.Document>;
type SwaggerDocs = Partial<OpenAPIV3.Document>;

const createSwaggerDocument: SwaggerDocument = async () => {
	const pathControllers = path.resolve(_dirname, '..', '..');
	const docsDirs = fs.readdirSync(pathControllers);

	const swaggerDocument: OpenAPIV3.Document = {
		openapi: '3.0.0',
		info: {
			title: 'RestroTime DOCS',
			version: '1.0.0',
			description: 'RestroTime DOCS',
		},
		paths: {},
		components: {
			schemas: {},
		},
	};

	for (const dir of docsDirs) {
		try {
			const isDocs = fs.existsSync(
				path.resolve(_dirname, '..', '..', dir, 'docs/index.ts'),
			);

			if (!isDocs) continue;

			const { default: docs } = await import(`../../${dir}/docs/index.ts`);


			const mergedObjects = mergeObjects<OpenAPIV3.Document, SwaggerDocs>(swaggerDocument, docs);
			Object.assign(swaggerDocument, mergedObjects);
		} catch (error) {
			console.error(error);
		}
	}
	return swaggerDocument;
};

export { createSwaggerDocument };
