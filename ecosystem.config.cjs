const dotenv = require('dotenv')
const env_production = dotenv.config({ path: '.env.production' }).parsed;

module.exports = {
	apps: [{
		name: 'kan',
		script: `pnpx serve .output/public`,
		env_production,
	}],

	deploy: {
		production: {
			user: 'dimitriaatos',
			host: 'grain',
			ref: 'origin/main',
			repo: 'https://github.com/dimitriaatos/kan.git',
			path: '/home/dimitriaatos/sites/kan/front',
			'pre-deploy-local': 'rsync -v --mkpath ./.env.production dimitriaatos@grain:/home/dimitriaatos/sites/kan/front/current/.env',
			'post-deploy': 'source ~/.nvm/nvm.sh && pnpm i && pnpm generate && pm2 reload ecosystem.config.cjs --env production',
			'ssh-options': 'ForwardAgent=yes'
		}
	}
}
