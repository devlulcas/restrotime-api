import { createServer } from 'http';
import { app } from './app';
import { PORT } from '@/config/envs';

const server = createServer(app);


if (import.meta.env.PROD) {
	server.listen(PORT, () => {
		console.log(`Server listening on port ${PORT}`);
	});
}

export const devApp = app;
