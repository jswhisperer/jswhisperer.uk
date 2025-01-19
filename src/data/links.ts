import BlueskyIcon from '@/components/icons/BlueskyIcon'
import GithubIcon from '@/components/icons/GithubIcon'
import TwitterIcon from '@/components/icons/TwitterIcon'
import DevToIcon from '@/components/icons/devto'

// ADD YOUR SOCIAL NETWORKS HERE
export const SOCIALNETWORKS = [
	{
		name: 'Github',
		url: 'https://github.com/jswhisperer',
		icon: GithubIcon
	},
	{
		name: 'DevTo',
		url: 'https:/dev.to/jswhisperer',
		icon: DevToIcon
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
