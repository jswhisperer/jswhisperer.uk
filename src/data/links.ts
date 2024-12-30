import BlueskyIcon from '@/components/icons/BlueskyIcon'
import TwitterIcon from '@/components/icons/TwitterIcon'

import GithubIcon from '@/components/icons/GithubIcon'

// ADD YOUR SOCIAL NETWORKS HERE
export const SOCIALNETWORKS = [
	{
		name: 'Github',
		url: 'https://github.com/jswhisperer',
		icon: GithubIcon
	},
	{
		name: 'Bluesky',
		url: 'https://bsky.app/profile/jswhisperer.bsky.social',
		icon: BlueskyIcon
	},
	{
		name: 'Twitter',
		url: 'https://x.com/jswhisperer',
		icon: TwitterIcon
	}
] as const
