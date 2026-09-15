'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { RxDashboard } from 'react-icons/rx'
import { IoIosAddCircleOutline } from 'react-icons/io'
import { HiMiniRocketLaunch } from 'react-icons/hi2'
import { FaLayerGroup, FaUserCircle, FaBitcoin, FaLink, FaRobot, FaGithub, FaGlobe } from 'react-icons/fa'
import { MdImage } from 'react-icons/md'
import { AiOutlineDollar } from "react-icons/ai";
import { TiMediaPause } from "react-icons/ti";
import { RiFolderUserFill } from "react-icons/ri";

type SidebarProps = {
    isOpen?: boolean
    onClose?: () => void
}

export default function DashboardSidebar({ isOpen, onClose }: SidebarProps) {
    const pathname = usePathname()

    const [openAirdrop, setOpenAirdrop] = useState(false)
    const [openDashboard, setOpenDashboard] = useState(false)
    const [openCommunity, setOpenCommunity] = useState(false)
    const [openCommunityDashboard, setOpenCommunityDashboard] = useState(false)
    const [openPortfolio, setOpenPortfolio] = useState(false)
    const [openPortfolioDashboard, setOpenPortfolioDashboard] = useState(false)
    const [openImages, setOpenImages] = useState(false)
    const [openImagesDashboard, setOpenImagesDashboard] = useState(false)
    const [openLink, setOpenLink] = useState(false)
    const [openLinkDashboard, setOpenLinkDashboard] = useState(false)

    const [openWeb3Tools, setOpenWeb3Tools] = useState(false)
    const [openWeb3ToolsDashboard, setOpenWeb3ToolsDashboard] = useState(false)
    const [openAITools, setOpenAITools] = useState(false)
    const [openAIToolsDashboard, setOpenAIToolsDashboard] = useState(false)
    const [openGithubRepos, setOpenGithubRepos] = useState(false)
    const [openGithubReposDashboard, setOpenGithubReposDashboard] = useState(false)
    const [openSupporter, setOpenSupporter] = useState(false)
    const [openSupporterDashboard, setOpenSupporterDashboard] = useState(false)
    const [openNet, setOpenNet] = useState(false)
    const [openNetDashboard, setOpenNetDashboard] = useState(false)
    const [openCreators, setOpenCreators] = useState(false)
    const [openCreatorsDashboard, setOpenCreatorsDashboard] = useState(false)
    const [openGuild, setOpenGuild] = useState(false)
    const [openGuildDashboard, setOpenGuildDashboard] = useState(false)


    // === HANDLE ACTIVE SECTIONS ===
    useEffect(() => {
        setOpenAirdrop(false)
        setOpenDashboard(false)
        setOpenCommunity(false)
        setOpenCommunityDashboard(false)
        setOpenPortfolio(false)
        setOpenPortfolioDashboard(false)
        setOpenImages(false)
        setOpenImagesDashboard(false)
        setOpenLink(false)
        setOpenLinkDashboard(false)
                setOpenWeb3Tools(false)
                setOpenWeb3ToolsDashboard(false)
                setOpenAITools(false)
                setOpenAIToolsDashboard(false)
                setOpenGithubRepos(false)
                setOpenGithubReposDashboard(false)
                setOpenSupporter(false)
                setOpenSupporterDashboard(false)
                setOpenCreators(false)
                setOpenCreatorsDashboard(false)
                setOpenGuild(false)
                setOpenGuildDashboard(false)


        setOpenWeb3Tools(false)
        setOpenWeb3ToolsDashboard(false)
        setOpenAITools(false)
        setOpenAIToolsDashboard(false)
        setOpenGithubRepos(false)
        setOpenGithubReposDashboard(false)
                setOpenSupporter(false)
                setOpenSupporterDashboard(false)


        // === AIRDROP PATH ===
        if (pathname.startsWith('/airdrop-menu/dashboard')) {
            setOpenAirdrop(true)
            if (!pathname.includes('/add-airdrop')) {
                setOpenDashboard(true)
            }
        }

        // === COMMUNITY PATH ===
        if (pathname.startsWith('/community-menu/dashboard')) {
            setOpenCommunity(true)
            if (!pathname.includes('/add-community')) {
                setOpenCommunityDashboard(true)
            }
        }

        // === PORTFOLIO PATH ===
        if (pathname.startsWith('/portfolio-menu/dashboard')) {
            setOpenPortfolio(true)
            setOpenPortfolioDashboard(true)
        }

        // === IMAGES PATH ===
        if (pathname.startsWith('/images-menu/dashboard')) {
            setOpenImages(true)
            if (!pathname.includes('/add-image')) {
                setOpenImagesDashboard(true)
            }
        }

        // === LINK PATH ===
        if (pathname.startsWith('/links-menu/dashboard')) {
            setOpenLink(true)
            if (!pathname.includes('/add-post')) {
                setOpenLinkDashboard(true)
            }
        }

    
        // === WEB3 TOOLS PATH ===
        if (pathname.startsWith('/web3-tools-menu/dashboard')) {
            setOpenWeb3Tools(true)
            if (!pathname.includes('/add-web3-tool')) {
                setOpenWeb3ToolsDashboard(true)
            }
        }

        // === AI TOOLS PATH ===
        if (pathname.startsWith('/ai-tools-menu/dashboard')) {
            setOpenAITools(true)
            if (!pathname.includes('/add-ai-tool')) {
                setOpenAIToolsDashboard(true)
            }
        }

        // === GITHUB REPOS PATH ===
        if (pathname.startsWith('/github-repos-menu/dashboard')) {
            setOpenGithubRepos(true)
            if (!pathname.includes('/add-github-repo')) {
                setOpenGithubReposDashboard(true)
            }
        }

        // === NET PATH ===
        if (pathname.startsWith('/net-menu/dashboard')) {
            setOpenNet(true)
            if (!pathname.includes('/add-net')) {
                setOpenNetDashboard(true)
            }
        }

        // === CREATORS PATH ===
        if (pathname.startsWith('/creators-menu/dashboard')) {
            setOpenCreators(true)
            if (!pathname.includes('/add-creator')) {
                setOpenCreatorsDashboard(true)
            }
        }

        // === GUILD PATH ===
        if (pathname.startsWith('/guild-menu/dashboard')) {
            setOpenGuild(true)
            if (!pathname.includes('/add-guild')) {
                setOpenGuildDashboard(true)
            }
        }

    }, [pathname])

    // === HANDLERS ===
    const handleAirdropDropdown = () => {
        setOpenAirdrop((prev) => {
            const next = !prev
            if (next) {
                setOpenCommunity(false)
                setOpenCommunityDashboard(false)
                setOpenPortfolio(false)
                setOpenPortfolioDashboard(false)
                setOpenImages(false)
                setOpenImagesDashboard(false)
                setOpenLink(false)
                setOpenLinkDashboard(false)
                setOpenWeb3Tools(false)
                setOpenWeb3ToolsDashboard(false)
                setOpenAITools(false)
                setOpenAIToolsDashboard(false)
                setOpenGithubRepos(false)
                setOpenGithubReposDashboard(false)
                setOpenSupporter(false)
                setOpenSupporterDashboard(false)


        setOpenWeb3Tools(false)
        setOpenWeb3ToolsDashboard(false)
        setOpenAITools(false)
        setOpenAIToolsDashboard(false)
        setOpenGithubRepos(false)
        setOpenGithubReposDashboard(false)
                setOpenSupporter(false)
                setOpenSupporterDashboard(false)

            }
            return next
        })
    }

    const handleDashboardDropdown = () => setOpenDashboard((v) => !v)

    const handleCommunityDropdown = () => {
        setOpenCommunity((prev) => {
            const next = !prev
            if (next) {
                setOpenAirdrop(false)
                setOpenDashboard(false)
                setOpenPortfolio(false)
                setOpenPortfolioDashboard(false)
                setOpenImages(false)
                setOpenImagesDashboard(false)
                setOpenLink(false)
                setOpenLinkDashboard(false)
                setOpenWeb3Tools(false)
                setOpenWeb3ToolsDashboard(false)
                setOpenAITools(false)
                setOpenAIToolsDashboard(false)
                setOpenGithubRepos(false)
                setOpenGithubReposDashboard(false)
                setOpenSupporter(false)
                setOpenSupporterDashboard(false)


        setOpenWeb3Tools(false)
        setOpenWeb3ToolsDashboard(false)
        setOpenAITools(false)
        setOpenAIToolsDashboard(false)
        setOpenGithubRepos(false)
        setOpenGithubReposDashboard(false)
                setOpenSupporter(false)
                setOpenSupporterDashboard(false)

            }
            return next
        })
    }

    const handleCommunityDashboardDropdown = () =>
        setOpenCommunityDashboard((v) => !v)

    const handlePortfolioDropdown = () => {
        setOpenPortfolio((prev) => {
            const next = !prev
            if (next) {
                setOpenAirdrop(false)
                setOpenDashboard(false)
                setOpenCommunity(false)
                setOpenCommunityDashboard(false)
                setOpenImages(false)
                setOpenImagesDashboard(false)
                setOpenLink(false)
                setOpenLinkDashboard(false)
                setOpenWeb3Tools(false)
                setOpenWeb3ToolsDashboard(false)
                setOpenAITools(false)
                setOpenAIToolsDashboard(false)
                setOpenGithubRepos(false)
                setOpenGithubReposDashboard(false)
                setOpenSupporter(false)
                setOpenSupporterDashboard(false)


        setOpenWeb3Tools(false)
        setOpenWeb3ToolsDashboard(false)
        setOpenAITools(false)
        setOpenAIToolsDashboard(false)
        setOpenGithubRepos(false)
        setOpenGithubReposDashboard(false)
                setOpenSupporter(false)
                setOpenSupporterDashboard(false)

            }
            return next
        })
    }

    const handlePortfolioDashboardDropdown = () =>
        setOpenPortfolioDashboard((v) => !v)

    const handleImagesDropdown = () => {
        setOpenImages(prev => {
            const next = !prev
            if (next) {
                setOpenAirdrop(false)
                setOpenDashboard(false)
                setOpenCommunity(false)
                setOpenCommunityDashboard(false)
                setOpenPortfolio(false)
                setOpenPortfolioDashboard(false)
                setOpenLink(false)
                setOpenLinkDashboard(false)
                setOpenWeb3Tools(false)
                setOpenWeb3ToolsDashboard(false)
                setOpenAITools(false)
                setOpenAIToolsDashboard(false)
                setOpenGithubRepos(false)
                setOpenGithubReposDashboard(false)
                setOpenSupporter(false)
                setOpenSupporterDashboard(false)


        setOpenWeb3Tools(false)
        setOpenWeb3ToolsDashboard(false)
        setOpenAITools(false)
        setOpenAIToolsDashboard(false)
        setOpenGithubRepos(false)
        setOpenGithubReposDashboard(false)
                setOpenSupporter(false)
                setOpenSupporterDashboard(false)

            }
            return next
        })
    }

    const handleImagesDashboardDropdown = () =>
        setOpenImagesDashboard(v => !v)

    const handleLinkDropdown = () => {
        setOpenLink(prev => {
            const next = !prev
            if (next) {
                setOpenAirdrop(false)
                setOpenDashboard(false)
                setOpenCommunity(false)
                setOpenCommunityDashboard(false)
                setOpenPortfolio(false)
                setOpenPortfolioDashboard(false)
                setOpenImages(false)
                setOpenImagesDashboard(false)
            }
            return next
        })
    }

    const handleLinkDashboardDropdown = () =>
        setOpenLinkDashboard(v => !v)

    const handleWeb3ToolsDropdown = () => {
        setOpenWeb3Tools(prev => {
            const next = !prev
            if (next) {
                setOpenAirdrop(false)
                setOpenDashboard(false)
                setOpenCommunity(false)
                setOpenCommunityDashboard(false)
                setOpenPortfolio(false)
                setOpenPortfolioDashboard(false)
                setOpenImages(false)
                setOpenImagesDashboard(false)
                setOpenLink(false)
                setOpenLinkDashboard(false)
                setOpenAITools(false)
                setOpenAIToolsDashboard(false)
                setOpenGithubRepos(false)
                setOpenGithubReposDashboard(false)
                setOpenSupporter(false)
                setOpenSupporterDashboard(false)
            }
            return next
        })
    }
    const handleWeb3ToolsDashboardDropdown = () => setOpenWeb3ToolsDashboard(v => !v)

    const handleAIToolsDropdown = () => {
        setOpenAITools(prev => {
            const next = !prev
            if (next) {
                setOpenAirdrop(false)
                setOpenDashboard(false)
                setOpenCommunity(false)
                setOpenCommunityDashboard(false)
                setOpenPortfolio(false)
                setOpenPortfolioDashboard(false)
                setOpenImages(false)
                setOpenImagesDashboard(false)
                setOpenLink(false)
                setOpenLinkDashboard(false)
                setOpenWeb3Tools(false)
                setOpenWeb3ToolsDashboard(false)
                setOpenGithubRepos(false)
                setOpenGithubReposDashboard(false)
                setOpenSupporter(false)
                setOpenSupporterDashboard(false)
            }
            return next
        })
    }
    const handleAIToolsDashboardDropdown = () => setOpenAIToolsDashboard(v => !v)

    const handleGithubReposDropdown = () => {
        setOpenGithubRepos(prev => {
            const next = !prev
            if (next) {
                setOpenAirdrop(false)
                setOpenDashboard(false)
                setOpenCommunity(false)
                setOpenCommunityDashboard(false)
                setOpenPortfolio(false)
                setOpenPortfolioDashboard(false)
                setOpenImages(false)
                setOpenImagesDashboard(false)
                setOpenLink(false)
                setOpenLinkDashboard(false)
                setOpenWeb3Tools(false)
                setOpenWeb3ToolsDashboard(false)
                setOpenAITools(false)
                setOpenAIToolsDashboard(false)
            }
            return next
        })
    }
    const handleGithubReposDashboardDropdown = () => setOpenGithubReposDashboard(v => !v)

    const handleNetDropdown = () => {
        setOpenNet(prev => {
            const next = !prev
            if (next) {
                setOpenAirdrop(false)
                setOpenDashboard(false)
                setOpenCommunity(false)
                setOpenCommunityDashboard(false)
                setOpenPortfolio(false)
                setOpenPortfolioDashboard(false)
                setOpenImages(false)
                setOpenImagesDashboard(false)
                setOpenLink(false)
                setOpenLinkDashboard(false)
                setOpenWeb3Tools(false)
                setOpenWeb3ToolsDashboard(false)
                setOpenAITools(false)
                setOpenAIToolsDashboard(false)
                setOpenGithubRepos(false)
                setOpenGithubReposDashboard(false)
                setOpenSupporter(false)
                setOpenSupporterDashboard(false)
                setOpenCreators(false)
                setOpenCreatorsDashboard(false)
            }
            return next
        })
    }
    const handleNetDashboardDropdown = () => setOpenNetDashboard(v => !v)

    const handleCreatorsDropdown = () => {
        setOpenCreators(prev => {
            const next = !prev
            if (next) {
                setOpenAirdrop(false)
                setOpenDashboard(false)
                setOpenCommunity(false)
                setOpenCommunityDashboard(false)
                setOpenPortfolio(false)
                setOpenPortfolioDashboard(false)
                setOpenImages(false)
                setOpenImagesDashboard(false)
                setOpenLink(false)
                setOpenLinkDashboard(false)
                setOpenWeb3Tools(false)
                setOpenWeb3ToolsDashboard(false)
                setOpenAITools(false)
                setOpenAIToolsDashboard(false)
                setOpenGithubRepos(false)
                setOpenGithubReposDashboard(false)
                setOpenNet(false)
                setOpenNetDashboard(false)
                setOpenSupporter(false)
                setOpenSupporterDashboard(false)
            }
            return next
        })
    }
    const handleCreatorsDashboardDropdown = () => setOpenCreatorsDashboard(v => !v)

    const handleGuildDropdown = () => {
        setOpenGuild(prev => {
            const next = !prev
            if (next) {
                setOpenAirdrop(false)
                setOpenDashboard(false)
                setOpenCommunity(false)
                setOpenCommunityDashboard(false)
                setOpenPortfolio(false)
                setOpenPortfolioDashboard(false)
                setOpenImages(false)
                setOpenImagesDashboard(false)
                setOpenLink(false)
                setOpenLinkDashboard(false)
                setOpenWeb3Tools(false)
                setOpenWeb3ToolsDashboard(false)
                setOpenAITools(false)
                setOpenAIToolsDashboard(false)
                setOpenGithubRepos(false)
                setOpenGithubReposDashboard(false)
                setOpenNet(false)
                setOpenNetDashboard(false)
                setOpenCreators(false)
                setOpenCreatorsDashboard(false)
                setOpenSupporter(false)
                setOpenSupporterDashboard(false)
            }
            return next
        })
    }
    const handleGuildDashboardDropdown = () => setOpenGuildDashboard(v => !v)

    const handleSupporterDropdown = () => {
        setOpenSupporter((prev) => {
            const next = !prev
            if (next) {
                setOpenAirdrop(false)
                setOpenDashboard(false)
                setOpenCommunity(false)
                setOpenCommunityDashboard(false)
                setOpenPortfolio(false)
                setOpenPortfolioDashboard(false)
                setOpenImages(false)
                setOpenImagesDashboard(false)
                setOpenLink(false)
                setOpenLinkDashboard(false)
                setOpenWeb3Tools(false)
                setOpenWeb3ToolsDashboard(false)
                setOpenAITools(false)
                setOpenAIToolsDashboard(false)
                setOpenGithubRepos(false)
                setOpenGithubReposDashboard(false)
            }
            return next
        })
    }

    const handleSupporterDashboardDropdown = () => setOpenSupporterDashboard((v) => !v)


    // === ACTIVE PATH DETECTION ===
    const isAnalyticsActive = pathname === '/airdrop-menu/dashboard'
    const isFreeActive = pathname === '/airdrop-menu/dashboard/airdrop/free'
    const isPaidActive = pathname === '/airdrop-menu/dashboard/airdrop/paid'
    const isEndedActive = pathname === '/airdrop-menu/dashboard/airdrop/ended'
    const isAddAirdropActive =
        pathname === '/airdrop-menu/dashboard/add-airdrop'
    const isDashboardPathActive =
        pathname.startsWith('/airdrop-menu/dashboard') &&
        !pathname.includes('/add-airdrop')

    const isCommunityAnalyticActive = pathname === '/community-menu/dashboard'
    const isAddCommunityActive =
        pathname === '/community-menu/dashboard/add-community'
    const isCommunityDashboardPathActive =
        pathname.startsWith('/community-menu/dashboard') &&
        !pathname.includes('/add-community')
    const isCommunityListActive =
        pathname === '/community-menu/dashboard/community-list'

    const isPortfolioActive = pathname === '/portfolio-menu/dashboard'
    const isPortfolioManageActive = pathname === '/portfolio-menu/dashboard/manage'
    const isPortfolioDashboardPathActive =
        pathname.startsWith('/portfolio-menu/dashboard')

    const isImagesActive = 
        pathname === '/images-menu/dashboard/images-list'
    const isImagesDashboardActive =
        pathname.startsWith('/images-menu/dashboard') && !pathname.includes('/add-image')
    const isImagesAnalyticActive =
        pathname === '/images-menu/dashboard'
    const isAddImageActive =
        pathname === '/images-menu/dashboard/add-image'

    const isLinkProfileActive = pathname === '/links-menu/dashboard/profile'
    const isLinkPostsActive = pathname === '/links-menu/dashboard/posts'
    const isAddLinkPostActive = pathname === '/links-menu/dashboard/add-post'
    const isLinkDashboardPathActive =
        pathname.startsWith('/links-menu/dashboard') && !pathname.includes('/add-post')
    const isLinkAnalyticActive = pathname === '/links-menu/dashboard'

    
    const isWeb3ToolsAnalyticActive = pathname === '/web3-tools-menu/dashboard'
    const isAddWeb3ToolActive = pathname === '/web3-tools-menu/dashboard/add-web3-tool'
    const isWeb3ToolsDashboardPathActive = pathname.startsWith('/web3-tools-menu/dashboard') && !pathname.includes('/add-web3-tool')
    const isWeb3ToolsListActive = pathname === '/web3-tools-menu/dashboard/web3-tools-list'

    const isAIToolsAnalyticActive = pathname === '/ai-tools-menu/dashboard'
    const isAddAIToolActive = pathname === '/ai-tools-menu/dashboard/add-ai-tool'
    const isAIToolsDashboardPathActive = pathname.startsWith('/ai-tools-menu/dashboard') && !pathname.includes('/add-ai-tool')
    const isAIToolsListActive = pathname === '/ai-tools-menu/dashboard/ai-tools-list'

    const isGithubReposAnalyticActive = pathname === '/github-repos-menu/dashboard'
    const isAddGithubRepoActive = pathname === '/github-repos-menu/dashboard/add-github-repo'
    const isGithubReposDashboardPathActive = pathname.startsWith('/github-repos-menu/dashboard') && !pathname.includes('/add-github-repo')
    const isGithubReposListActive = pathname === '/github-repos-menu/dashboard/github-repos-list'
    const isRepoSubmissionsActive = pathname === '/github-repos-menu/dashboard/repo-submissions'
    const isFeedbackActive = pathname === '/github-repos-menu/dashboard/feedback'

    // === SUPPORTER ===
    const isSupporterAnalyticActive = pathname === '/supporter-menu/dashboard'
    const isAddSupporterActive = pathname === '/supporter-menu/dashboard/add-supporter'
    const isSupporterDashboardPathActive = pathname.startsWith('/supporter-menu/dashboard') && !pathname.includes('/add-supporter')
    const isSupporterListActive = pathname === '/supporter-menu/dashboard/supporter-list'
    const isSupportRequestsActive = pathname === '/supporter-menu/dashboard/support-requests'

    // === NET ===
    const isNetAnalyticActive = pathname === '/net-menu/dashboard'
    const isAddNetActive = pathname === '/net-menu/dashboard/add-net'
    const isNetDashboardPathActive = pathname.startsWith('/net-menu/dashboard') && !pathname.includes('/add-net')
    const isNetListActive = pathname === '/net-menu/dashboard/net-list'

    // === CREATORS ===
    const isCreatorsAnalyticActive = pathname === '/creators-menu/dashboard'
    const isAddCreatorActive = pathname === '/creators-menu/dashboard/add-creator'
    const isCreatorsDashboardPathActive = pathname.startsWith('/creators-menu/dashboard') && !pathname.includes('/add-creator')
    const isCreatorsListActive = pathname === '/creators-menu/dashboard/creators-list'

    // === GUILD ===
    const isGuildAnalyticActive = pathname === '/guild-menu/dashboard'
    const isAddGuildActive = pathname === '/guild-menu/dashboard/add-guild'
    const isGuildDashboardPathActive = pathname.startsWith('/guild-menu/dashboard') && !pathname.includes('/add-guild')
    const isGuildListActive = pathname === '/guild-menu/dashboard/guild-list'

    // === SIDEBAR CONTENT ===
    const content = (
        <>
            {/* Sidebar Header */}
            <div className="h-16 flex items-center gap-3 px-6 sidebar-border">
                <img
                    src="https://cdn.nekowawolf.xyz/image/2026/1787422451_logo.webp"
                    alt="logo"
                    className="h-9 w-9 rounded-md object-cover"
                />
                <span className="text-xl font-semibold text-primary">
                    Nww Admin
                </span>
            </div>

            {/* Navigation */}
            <nav className="px-4 py-6 space-y-2 overflow-y-auto">
                <p className="px-2 text-xs font-semibold uppercase text-muted tracking-wider">
                    Menu
                </p>

                {/* === Airdrop Group === */}
                <div>
                    <button
                        type="button"
                        onClick={handleAirdropDropdown}
                        className={`cursor-pointer group flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors w-full text-left border-l-4 ${
                            pathname.startsWith('/airdrop-menu/dashboard')
                                ? 'border-accent text-accent bg-accent/10'
                                : 'border-transparent text-secondary hover:hover-bg'
                            }`}
                    >
                        <HiMiniRocketLaunch
                            className={`${
                                pathname.startsWith('/airdrop-menu/dashboard')
                                    ? 'text-accent'
                                    : 'text-muted'
                            }`}
                            size={18}
                        />
                        <span>Airdrop</span>
                        <i
                            className={`fa-solid fa-caret-down ml-auto text-xs transition-transform ${
                                openAirdrop ? 'rotate-180' : ''
                            }`}
                        />
                    </button>

                    {openAirdrop && (
                        <div className="pl-8 mt-2 space-y-1">
                            <button
                                type="button"
                                onClick={handleDashboardDropdown}
                                className={`cursor-pointer group flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors w-full text-left border-l-4 ${
                                    isDashboardPathActive
                                        ? 'border-accent text-accent bg-accent/10'
                                        : 'border-transparent text-secondary hover:hover-bg'
                                }`}
                            >
                                <RxDashboard
                                    className={`${
                                        isDashboardPathActive
                                            ? 'text-accent'
                                            : 'text-muted'
                                    }`}
                                    size={18}
                                />
                                <span>Dashboard</span>
                                <i
                                    className={`fa-solid fa-caret-down ml-auto text-xs transition-transform ${
                                        openDashboard ? 'rotate-180' : ''
                                    }`}
                                />
                            </button>

                            {openDashboard && (
                                <div className="pl-8 mt-1 space-y-1">
                                    <Link
                                        href="/airdrop-menu/dashboard"
                                        className={`block rounded-lg px-0 py-2 text-sm transition-colors ${
                                            isAnalyticsActive
                                                ? 'text-accent font-semibold'
                                                : 'text-secondary hover:text-accent'
                                        }`}
                                    >
                                        Analytics
                                    </Link>
                                    <Link
                                        href="/airdrop-menu/dashboard/airdrop/free"
                                        className={`block rounded-lg px-0 py-2 text-sm transition-colors ${
                                            isFreeActive
                                                ? 'text-accent font-semibold'
                                                : 'text-secondary hover:text-accent'
                                        }`}
                                    >
                                        Airdrop Free
                                    </Link>
                                    <Link
                                        href="/airdrop-menu/dashboard/airdrop/paid"
                                        className={`block rounded-lg px-0 py-2 text-sm transition-colors ${
                                            isPaidActive
                                                ? 'text-accent font-semibold'
                                                : 'text-secondary hover:text-accent'
                                        }`}
                                    >
                                        Airdrop Paid
                                    </Link>
                                    <Link
                                        href="/airdrop-menu/dashboard/airdrop/ended"
                                        className={`block rounded-lg px-0 py-2 text-sm transition-colors ${
                                            isEndedActive
                                                ? 'text-accent font-semibold'
                                                : 'text-secondary hover:text-accent'
                                        }`}
                                    >
                                        Airdrop Ended
                                    </Link>
                                </div>
                            )}

                            <Link
                                href="/airdrop-menu/dashboard/add-airdrop"
                                className={`group flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors border-l-4 ${
                                    isAddAirdropActive
                                        ? 'border-accent text-accent bg-accent/10'
                                        : 'border-transparent text-secondary hover:hover-bg'
                                }`}
                            >
                                <IoIosAddCircleOutline
                                    className={`${
                                        isAddAirdropActive
                                            ? 'text-accent'
                                            : 'text-muted'
                                    }`}
                                    size={18}
                                />
                                <span>Add Airdrop</span>
                            </Link>
                        </div>
                    )}
                </div>

                {/* === Community Group === */}
                <div>
                    <button
                        type="button"
                        onClick={handleCommunityDropdown}
                        className={`cursor-pointer group flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors w-full text-left border-l-4 ${
                            pathname.startsWith('/community-menu/dashboard')
                                ? 'border-accent text-accent bg-accent/10'
                                : 'border-transparent text-secondary hover:hover-bg'

                        }`}
                    >
                        <FaLayerGroup
                            className={`${
                                pathname.startsWith('/community-menu/dashboard')
                                    ? 'text-accent'
                                    : 'text-muted'
                            }`}
                            size={18}
                        />
                        <span>Community</span>
                        <i
                            className={`fa-solid fa-caret-down ml-auto text-xs transition-transform ${
                                openCommunity ? 'rotate-180' : ''
                            }`}
                        />
                    </button>

                    {openCommunity && (
                        <div className="pl-8 mt-2 space-y-1">
                            <button
                                type="button"
                                onClick={handleCommunityDashboardDropdown}
                                className={`cursor-pointer group flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors w-full text-left border-l-4 ${
                                    isCommunityDashboardPathActive
                                        ? 'border-accent text-accent bg-accent/10'
                                        : 'border-transparent text-secondary hover:hover-bg'
                                }`}
                            >
                                <RxDashboard
                                    className={`${
                                        isCommunityDashboardPathActive
                                            ? 'text-accent'
                                            : 'text-muted'
                                    }`}
                                    size={18}
                                />
                                <span>Dashboard</span>
                                <i
                                    className={`fa-solid fa-caret-down ml-auto text-xs transition-transform ${
                                        openCommunityDashboard
                                            ? 'rotate-180'
                                            : ''
                                    }`}
                                />
                            </button>

                            {openCommunityDashboard && (
                                <div className="pl-8 mt-1 space-y-1">
                                    <Link
                                        href="/community-menu/dashboard"
                                        className={`block rounded-lg px-0 py-2 text-sm transition-colors ${
                                            isCommunityAnalyticActive
                                                ? 'text-accent font-semibold'
                                                : 'text-secondary hover:text-accent'
                                        }`}
                                    >
                                        Analytic
                                    </Link>
                                    <Link
                                        href="/community-menu/dashboard/community-list"
                                        className={`block rounded-lg px-0 py-2 text-sm transition-colors ${
                                            isCommunityListActive
                                                ? 'text-accent font-semibold'
                                                : 'text-secondary hover:text-accent'
                                        }`}
                                    >
                                        Community List
                                    </Link>
                                </div>
                            )}

                            <Link
                                href="/community-menu/dashboard/add-community"
                                className={`group flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors border-l-4 ${
                                    isAddCommunityActive
                                        ? 'border-accent text-accent bg-accent/10'
                                        : 'border-transparent text-secondary hover:hover-bg'
                                }`}
                            >
                                <IoIosAddCircleOutline
                                    className={`${
                                        isAddCommunityActive
                                            ? 'text-accent'
                                            : 'text-muted'
                                    }`}
                                    size={18}
                                />
                                <span>Add Community</span>
                            </Link>
                        </div>
                    )}
                </div>
                
                {/* === Portfolio Group === */}
                <div>
                    <button
                        type="button"
                        onClick={handlePortfolioDropdown}
                        className={`cursor-pointer group flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors w-full text-left border-l-4 ${
                            pathname.startsWith('/portfolio-menu/dashboard')
                                ? 'border-accent text-accent bg-accent/10'
                                : 'border-transparent text-secondary hover:hover-bg'
                        }`}
                    >
                        <FaUserCircle
                            className={`${
                                pathname.startsWith('/portfolio-menu/dashboard')
                                    ? 'text-accent'
                                    : 'text-muted'
                            }`}
                            size={18}
                        />
                        <span>Portfolio</span>
                        <i
                            className={`fa-solid fa-caret-down ml-auto text-xs transition-transform ${
                                openPortfolio ? 'rotate-180' : ''
                            }`}
                        />
                    </button>

                    {openPortfolio && (
                        <div className="pl-8 mt-2 space-y-1">
                            <button
                                type="button"
                                onClick={handlePortfolioDashboardDropdown}
                                className={`cursor-pointer group flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors w-full text-left border-l-4 ${
                                    isPortfolioDashboardPathActive
                                        ? 'border-accent text-accent bg-accent/10'
                                        : 'border-transparent text-secondary hover:hover-bg'
                                }`}
                            >
                                <RxDashboard
                                    className={`${
                                        isPortfolioDashboardPathActive
                                            ? 'text-accent'
                                            : 'text-muted'
                                    }`}
                                    size={18}
                                />
                                <span>Dashboard</span>
                                <i
                                    className={`fa-solid fa-caret-down ml-auto text-xs transition-transform ${
                                        openPortfolioDashboard ? 'rotate-180' : ''
                                    }`}
                                />
                            </button>

                            {openPortfolioDashboard && (
                                <div className="pl-8 mt-1 space-y-1">
                                    <Link
                                        href="/portfolio-menu/dashboard"
                                        className={`block rounded-lg px-0 py-2 text-sm transition-colors ${
                                            isPortfolioActive
                                                ? 'text-accent font-semibold'
                                                : 'text-secondary hover:text-accent'
                                        }`}
                                    >
                                        Analytic
                                    </Link>
                                    <Link
                                        href="/portfolio-menu/dashboard/manage"
                                        className={`block rounded-lg px-0 py-2 text-sm transition-colors ${
                                            isPortfolioManageActive
                                                ? 'text-accent font-semibold'
                                                : 'text-secondary hover:text-accent'
                                        }`}
                                    >
                                        Manage Portfolio
                                    </Link>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* === Link Group === */}
                <div>
                    <button
                        type="button"
                        onClick={handleLinkDropdown}
                        className={`cursor-pointer group flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors w-full text-left border-l-4 ${
                            pathname.startsWith('/links-menu/dashboard')
                                ? 'border-accent text-accent bg-accent/10'
                                : 'border-transparent text-secondary hover:hover-bg'
                        }`}
                    >
                        <FaLink
                            className={`${
                                pathname.startsWith('/links-menu/dashboard')
                                    ? 'text-accent'
                                    : 'text-muted'
                            }`}
                            size={18}
                        />
                        <span>Link</span>
                        <i
                            className={`fa-solid fa-caret-down ml-auto text-xs transition-transform ${
                                openLink ? 'rotate-180' : ''
                            }`}
                        />
                    </button>

                    {openLink && (
                        <div className="pl-8 mt-2 space-y-1">
                            <button
                                type="button"
                                onClick={handleLinkDashboardDropdown}
                                className={`cursor-pointer group flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors w-full text-left border-l-4 ${
                                    isLinkDashboardPathActive
                                        ? 'border-accent text-accent bg-accent/10'
                                        : 'border-transparent text-secondary hover:hover-bg'
                                }`}
                            >
                                <RxDashboard
                                    className={`${
                                        isLinkDashboardPathActive
                                            ? 'text-accent'
                                            : 'text-muted'
                                    }`}
                                    size={18}
                                />
                                <span>Dashboard</span>
                                <i
                                    className={`fa-solid fa-caret-down ml-auto text-xs transition-transform ${
                                        openLinkDashboard ? 'rotate-180' : ''
                                    }`}
                                />
                            </button>

                            {openLinkDashboard && (
                                <div className="pl-8 mt-1 space-y-1">
                                     <Link
                                        href="/links-menu/dashboard"
                                        className={`block rounded-lg px-0 py-2 text-sm transition-colors ${
                                            isLinkAnalyticActive
                                                ? 'text-accent font-semibold'
                                                : 'text-secondary hover:text-accent'
                                        }`}
                                    >
                                        Analytic
                                    </Link>
                                     <Link
                                        href="/links-menu/dashboard/profile"
                                        className={`block rounded-lg px-0 py-2 text-sm transition-colors ${
                                            isLinkProfileActive

                                                ? 'text-accent font-semibold'
                                                : 'text-secondary hover:text-accent'
                                        }`}
                                    >
                                        Profile
                                    </Link>
                                    <Link
                                        href="/links-menu/dashboard/posts"
                                        className={`block rounded-lg px-0 py-2 text-sm transition-colors ${
                                            isLinkPostsActive
                                                ? 'text-accent font-semibold'
                                                : 'text-secondary hover:text-accent'
                                        }`}
                                    >
                                        Posts
                                    </Link>
                                </div>
                            )}

                            <Link
                                href="/links-menu/dashboard/add-post"
                                className={`group flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors border-l-4 ${
                                    isAddLinkPostActive
                                        ? 'border-accent text-accent bg-accent/10'
                                        : 'border-transparent text-secondary hover:hover-bg'
                                }`}
                            >
                                <IoIosAddCircleOutline
                                    className={`${
                                        isAddLinkPostActive ? 'text-accent' : 'text-muted'
                                    }`}
                                    size={18}
                                />
                                <span>Add Post</span>
                            </Link>
                        </div>
                    )}
                </div>

                {/* === Web3 Tools Group === */}
                <div>
                    <button
                        type="button"
                        onClick={handleWeb3ToolsDropdown}
                        className={`cursor-pointer group flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors w-full text-left border-l-4 ${
                            pathname.startsWith('/web3-tools-menu/dashboard')
                                ? 'border-accent text-accent bg-accent/10'
                                : 'border-transparent text-secondary hover:hover-bg'
                        }`}
                    >
                        <FaBitcoin
                            className={`${
                                pathname.startsWith('/web3-tools-menu/dashboard')
                                    ? 'text-accent'
                                    : 'text-muted'
                            }`}
                            size={18}
                        />
                        <span>Web3 Tools</span>
                        <i
                            className={`fa-solid fa-caret-down ml-auto text-xs transition-transform ${
                                openWeb3Tools ? 'rotate-180' : ''
                            }`}
                        />
                    </button>

                    {openWeb3Tools && (
                        <div className="pl-8 mt-2 space-y-1">
                            <button
                                type="button"
                                onClick={handleWeb3ToolsDashboardDropdown}
                                className={`cursor-pointer group flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors w-full text-left border-l-4 ${
                                    isWeb3ToolsDashboardPathActive
                                        ? 'border-accent text-accent bg-accent/10'
                                        : 'border-transparent text-secondary hover:hover-bg'
                                }`}
                            >
                                <RxDashboard
                                    className={`${
                                        isWeb3ToolsDashboardPathActive
                                            ? 'text-accent'
                                            : 'text-muted'
                                    }`}
                                    size={18}
                                />
                                <span>Dashboard</span>
                                <i
                                    className={`fa-solid fa-caret-down ml-auto text-xs transition-transform ${
                                        openWeb3ToolsDashboard ? 'rotate-180' : ''
                                    }`}
                                />
                            </button>

                            {openWeb3ToolsDashboard && (
                                <div className="pl-8 mt-1 space-y-1">
                                    <Link
                                        href="/web3-tools-menu/dashboard"
                                        className={`block rounded-lg px-0 py-2 text-sm transition-colors ${
                                            isWeb3ToolsAnalyticActive
                                                ? 'text-accent font-semibold'
                                                : 'text-secondary hover:text-accent'
                                        }`}
                                    >
                                        Analytic
                                    </Link>
                                    <Link
                                        href="/web3-tools-menu/dashboard/web3-tools-list"
                                        className={`block rounded-lg px-0 py-2 text-sm transition-colors ${
                                            isWeb3ToolsListActive
                                                ? 'text-accent font-semibold'
                                                : 'text-secondary hover:text-accent'
                                        }`}
                                    >
                                        Web3 Tools List
                                    </Link>
                                </div>
                            )}

                            <Link
                                href="/web3-tools-menu/dashboard/add-web3-tool"
                                className={`group flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors border-l-4 ${
                                    isAddWeb3ToolActive
                                        ? 'border-accent text-accent bg-accent/10'
                                        : 'border-transparent text-secondary hover:hover-bg'
                                }`}
                            >
                                <IoIosAddCircleOutline
                                    className={`${
                                        isAddWeb3ToolActive ? 'text-accent' : 'text-muted'
                                    }`}
                                    size={18}
                                />
                                <span>Add Web3 Tool</span>
                            </Link>
                        </div>
                    )}
                </div>

                {/* === AI Tools Group === */}
                <div>
                    <button
                        type="button"
                        onClick={handleAIToolsDropdown}
                        className={`cursor-pointer group flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors w-full text-left border-l-4 ${
                            pathname.startsWith('/ai-tools-menu/dashboard')
                                ? 'border-accent text-accent bg-accent/10'
                                : 'border-transparent text-secondary hover:hover-bg'
                        }`}
                    >
                        <FaRobot
                            className={`${
                                pathname.startsWith('/ai-tools-menu/dashboard')
                                    ? 'text-accent'
                                    : 'text-muted'
                            }`}
                            size={18}
                        />
                        <span>AI Tools</span>
                        <i
                            className={`fa-solid fa-caret-down ml-auto text-xs transition-transform ${
                                openAITools ? 'rotate-180' : ''
                            }`}
                        />
                    </button>

                    {openAITools && (
                        <div className="pl-8 mt-2 space-y-1">
                            <button
                                type="button"
                                onClick={handleAIToolsDashboardDropdown}
                                className={`cursor-pointer group flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors w-full text-left border-l-4 ${
                                    isAIToolsDashboardPathActive
                                        ? 'border-accent text-accent bg-accent/10'
                                        : 'border-transparent text-secondary hover:hover-bg'
                                }`}
                            >
                                <RxDashboard
                                    className={`${
                                        isAIToolsDashboardPathActive
                                            ? 'text-accent'
                                            : 'text-muted'
                                    }`}
                                    size={18}
                                />
                                <span>Dashboard</span>
                                <i
                                    className={`fa-solid fa-caret-down ml-auto text-xs transition-transform ${
                                        openAIToolsDashboard ? 'rotate-180' : ''
                                    }`}
                                />
                            </button>

                            {openAIToolsDashboard && (
                                <div className="pl-8 mt-1 space-y-1">
                                    <Link
                                        href="/ai-tools-menu/dashboard"
                                        className={`block rounded-lg px-0 py-2 text-sm transition-colors ${
                                            isAIToolsAnalyticActive
                                                ? 'text-accent font-semibold'
                                                : 'text-secondary hover:text-accent'
                                        }`}
                                    >
                                        Analytic
                                    </Link>
                                    <Link
                                        href="/ai-tools-menu/dashboard/ai-tools-list"
                                        className={`block rounded-lg px-0 py-2 text-sm transition-colors ${
                                            isAIToolsListActive
                                                ? 'text-accent font-semibold'
                                                : 'text-secondary hover:text-accent'
                                        }`}
                                    >
                                        AI Tools List
                                    </Link>
                                </div>
                            )}

                            <Link
                                href="/ai-tools-menu/dashboard/add-ai-tool"
                                className={`group flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors border-l-4 ${
                                    isAddAIToolActive
                                        ? 'border-accent text-accent bg-accent/10'
                                        : 'border-transparent text-secondary hover:hover-bg'
                                }`}
                            >
                                <IoIosAddCircleOutline
                                    className={`${
                                        isAddAIToolActive ? 'text-accent' : 'text-muted'
                                    }`}
                                    size={18}
                                />
                                <span>Add AI Tool</span>
                            </Link>
                        </div>
                    )}
                </div>

                {/* === GitHub Repos Group === */}
                <div>
                    <button
                        type="button"
                        onClick={handleGithubReposDropdown}
                        className={`cursor-pointer group flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors w-full text-left border-l-4 ${
                            pathname.startsWith('/github-repos-menu/dashboard')
                                ? 'border-accent text-accent bg-accent/10'
                                : 'border-transparent text-secondary hover:hover-bg'
                        }`}
                    >
                        <FaGithub
                            className={`${
                                pathname.startsWith('/github-repos-menu/dashboard')
                                    ? 'text-accent'
                                    : 'text-muted'
                            }`}
                            size={18}
                        />
                        <span>GitHub Repos</span>
                        <i
                            className={`fa-solid fa-caret-down ml-auto text-xs transition-transform ${
                                openGithubRepos ? 'rotate-180' : ''
                            }`}
                        />
                    </button>

                    {openGithubRepos && (
                        <div className="pl-8 mt-2 space-y-1">
                            <button
                                type="button"
                                onClick={handleGithubReposDashboardDropdown}
                                className={`cursor-pointer group flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors w-full text-left border-l-4 ${
                                    isGithubReposDashboardPathActive
                                        ? 'border-accent text-accent bg-accent/10'
                                        : 'border-transparent text-secondary hover:hover-bg'
                                }`}
                            >
                                <RxDashboard
                                    className={`${
                                        isGithubReposDashboardPathActive
                                            ? 'text-accent'
                                            : 'text-muted'
                                    }`}
                                    size={18}
                                />
                                <span>Dashboard</span>
                                <i
                                    className={`fa-solid fa-caret-down ml-auto text-xs transition-transform ${
                                        openGithubReposDashboard ? 'rotate-180' : ''
                                    }`}
                                />
                            </button>

                            {openGithubReposDashboard && (
                                <div className="pl-8 mt-1 space-y-1">
                                    <Link
                                        href="/github-repos-menu/dashboard"
                                        className={`block rounded-lg px-0 py-2 text-sm transition-colors ${
                                            isGithubReposAnalyticActive
                                                ? 'text-accent font-semibold'
                                                : 'text-secondary hover:text-accent'
                                        }`}
                                    >
                                        Analytic
                                    </Link>
                                    <Link
                                        href="/github-repos-menu/dashboard/github-repos-list"
                                        className={`block rounded-lg px-0 py-2 text-sm transition-colors ${
                                            isGithubReposListActive
                                                ? 'text-accent font-semibold'
                                                : 'text-secondary hover:text-accent'
                                        }`}
                                    >
                                        GitHub Repos List
                                    </Link>
                                    <Link
                                        href="/github-repos-menu/dashboard/repo-submissions"
                                        className={`block rounded-lg px-0 py-2 text-sm transition-colors ${
                                            isRepoSubmissionsActive
                                                ? 'text-accent font-semibold'
                                                : 'text-secondary hover:text-accent'
                                        }`}
                                    >
                                        Repo Submissions
                                    </Link>
                                    <Link
                                        href="/github-repos-menu/dashboard/feedback"
                                        className={`block rounded-lg px-0 py-2 text-sm transition-colors ${
                                            isFeedbackActive
                                                ? 'text-accent font-semibold'
                                                : 'text-secondary hover:text-accent'
                                        }`}
                                    >
                                        Feedback
                                    </Link>
                                </div>
                            )}

                            <Link
                                href="/github-repos-menu/dashboard/add-github-repo"
                                className={`group flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors border-l-4 ${
                                    isAddGithubRepoActive
                                        ? 'border-accent text-accent bg-accent/10'
                                        : 'border-transparent text-secondary hover:hover-bg'
                                }`}
                            >
                                <IoIosAddCircleOutline
                                    className={`${
                                        isAddGithubRepoActive ? 'text-accent' : 'text-muted'
                                    }`}
                                    size={18}
                                />
                                <span>Add GitHub Repo</span>
                            </Link>
                        </div>
                    )}
                </div>

                {/* === Net Group === */}
                <div>
                    <button
                        type="button"
                        onClick={handleNetDropdown}
                        className={`cursor-pointer group flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors w-full text-left border-l-4 ${
                            pathname.startsWith('/net-menu/dashboard')
                                ? 'border-accent text-accent bg-accent/10'
                                : 'border-transparent text-secondary hover:hover-bg'
                        }`}
                    >
                        <FaGlobe
                            className={`${
                                pathname.startsWith('/net-menu/dashboard')
                                    ? 'text-accent'
                                    : 'text-muted'
                            }`}
                            size={18}
                        />
                        <span>Net</span>
                        <i
                            className={`fa-solid fa-caret-down ml-auto text-xs transition-transform ${
                                openNet ? 'rotate-180' : ''
                            }`}
                        />
                    </button>

                    {openNet && (
                        <div className="pl-8 mt-2 space-y-1">
                            <button
                                type="button"
                                onClick={handleNetDashboardDropdown}
                                className={`cursor-pointer group flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors w-full text-left border-l-4 ${
                                    isNetDashboardPathActive
                                        ? 'border-accent text-accent bg-accent/10'
                                        : 'border-transparent text-secondary hover:hover-bg'
                                }`}
                            >
                                <RxDashboard
                                    className={`${
                                        isNetDashboardPathActive
                                            ? 'text-accent'
                                            : 'text-muted'
                                    }`}
                                    size={18}
                                />
                                <span>Dashboard</span>
                                <i
                                    className={`fa-solid fa-caret-down ml-auto text-xs transition-transform ${
                                        openNetDashboard ? 'rotate-180' : ''
                                    }`}
                                />
                            </button>

                            {openNetDashboard && (
                                <div className="pl-8 mt-1 space-y-1">
                                    <Link
                                        href="/net-menu/dashboard"
                                        className={`block rounded-lg px-0 py-2 text-sm transition-colors ${
                                            isNetAnalyticActive
                                                ? 'text-accent font-semibold'
                                                : 'text-secondary hover:text-accent'
                                        }`}
                                    >
                                        Analytic
                                    </Link>
                                    <Link
                                        href="/net-menu/dashboard/net-list"
                                        className={`block rounded-lg px-0 py-2 text-sm transition-colors ${
                                            isNetListActive
                                                ? 'text-accent font-semibold'
                                                : 'text-secondary hover:text-accent'
                                        }`}
                                    >
                                        Net List
                                    </Link>
                                </div>
                            )}

                            <Link
                                href="/net-menu/dashboard/add-net"
                                className={`group flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors border-l-4 ${
                                    isAddNetActive
                                        ? 'border-accent text-accent bg-accent/10'
                                        : 'border-transparent text-secondary hover:hover-bg'
                                }`}
                            >
                                <IoIosAddCircleOutline
                                    className={`${
                                        isAddNetActive ? 'text-accent' : 'text-muted'
                                    }`}
                                    size={18}
                                />
                                <span>Add Net</span>
                            </Link>
                        </div>
                    )}
                </div>

                {/* === Creators Group === */}
                <div>
                    <button
                        type="button"
                        onClick={handleCreatorsDropdown}
                        className={`cursor-pointer group flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors w-full text-left border-l-4 ${
                            pathname.startsWith('/creators-menu/dashboard')
                                ? 'border-accent text-accent bg-accent/10'
                                : 'border-transparent text-secondary hover:hover-bg'
                        }`}
                    >
                        <TiMediaPause
                            className={`${
                                pathname.startsWith('/creators-menu/dashboard')
                                    ? 'text-accent'
                                    : 'text-muted'
                            }`}
                            size={18}
                        />
                        <span>Creators</span>
                        <i
                            className={`fa-solid fa-caret-down ml-auto text-xs transition-transform ${
                                openCreators ? 'rotate-180' : ''
                            }`}
                        />
                    </button>

                    {openCreators && (
                        <div className="pl-8 mt-2 space-y-1">
                            <button
                                type="button"
                                onClick={handleCreatorsDashboardDropdown}
                                className={`cursor-pointer group flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors w-full text-left border-l-4 ${
                                    isCreatorsDashboardPathActive
                                        ? 'border-accent text-accent bg-accent/10'
                                        : 'border-transparent text-secondary hover:hover-bg'
                                }`}
                            >
                                <RxDashboard
                                    className={`${
                                        isCreatorsDashboardPathActive
                                            ? 'text-accent'
                                            : 'text-muted'
                                    }`}
                                    size={18}
                                />
                                <span>Dashboard</span>
                                <i
                                    className={`fa-solid fa-caret-down ml-auto text-xs transition-transform ${
                                        openCreatorsDashboard ? 'rotate-180' : ''
                                    }`}
                                />
                            </button>

                            {openCreatorsDashboard && (
                                <div className="pl-8 mt-1 space-y-1">
                                    <Link
                                        href="/creators-menu/dashboard"
                                        className={`block rounded-lg px-0 py-2 text-sm transition-colors ${
                                            isCreatorsAnalyticActive
                                                ? 'text-accent font-semibold'
                                                : 'text-secondary hover:text-accent'
                                        }`}
                                    >
                                        Analytic
                                    </Link>
                                    <Link
                                        href="/creators-menu/dashboard/creators-list"
                                        className={`block rounded-lg px-0 py-2 text-sm transition-colors ${
                                            isCreatorsListActive
                                                ? 'text-accent font-semibold'
                                                : 'text-secondary hover:text-accent'
                                        }`}
                                    >
                                        Creators List
                                    </Link>
                                </div>
                            )}

                            <Link
                                href="/creators-menu/dashboard/add-creator"
                                className={`group flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors border-l-4 ${
                                    isAddCreatorActive
                                        ? 'border-accent text-accent bg-accent/10'
                                        : 'border-transparent text-secondary hover:hover-bg'
                                }`}
                            >
                                <IoIosAddCircleOutline
                                    className={`${
                                        isAddCreatorActive ? 'text-accent' : 'text-muted'
                                    }`}
                                    size={18}
                                />
                                <span>Add Creator</span>
                            </Link>
                        </div>
                    )}
                </div>

                {/* === Guild Group === */}
                <div>
                    <button
                        type="button"
                        onClick={handleGuildDropdown}
                        className={`cursor-pointer group flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors w-full text-left border-l-4 ${
                            pathname.startsWith('/guild-menu/dashboard')
                                ? 'border-accent text-accent bg-accent/10'
                                : 'border-transparent text-secondary hover:hover-bg'
                        }`}
                    >
                        <RiFolderUserFill
                            className={`${
                                pathname.startsWith('/guild-menu/dashboard')
                                    ? 'text-accent'
                                    : 'text-muted'
                            }`}
                            size={18}
                        />
                        <span>Guild</span>
                        <i
                            className={`fa-solid fa-caret-down ml-auto text-xs transition-transform ${
                                openGuild ? 'rotate-180' : ''
                            }`}
                        />
                    </button>

                    {openGuild && (
                        <div className="pl-8 mt-2 space-y-1">
                            <button
                                type="button"
                                onClick={handleGuildDashboardDropdown}
                                className={`cursor-pointer group flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors w-full text-left border-l-4 ${
                                    isGuildDashboardPathActive
                                        ? 'border-accent text-accent bg-accent/10'
                                        : 'border-transparent text-secondary hover:hover-bg'
                                }`}
                            >
                                <RxDashboard
                                    className={`${
                                        isGuildDashboardPathActive
                                            ? 'text-accent'
                                            : 'text-muted'
                                    }`}
                                    size={18}
                                />
                                <span>Dashboard</span>
                                <i
                                    className={`fa-solid fa-caret-down ml-auto text-xs transition-transform ${
                                        openGuildDashboard ? 'rotate-180' : ''
                                    }`}
                                />
                            </button>

                            {openGuildDashboard && (
                                <div className="pl-8 mt-1 space-y-1">
                                    <Link
                                        href="/guild-menu/dashboard"
                                        className={`block rounded-lg px-0 py-2 text-sm transition-colors ${
                                            isGuildAnalyticActive
                                                ? 'text-accent font-semibold'
                                                : 'text-secondary hover:text-accent'
                                        }`}
                                    >
                                        Analytic
                                    </Link>
                                    <Link
                                        href="/guild-menu/dashboard/guild-list"
                                        className={`block rounded-lg px-0 py-2 text-sm transition-colors ${
                                            isGuildListActive
                                                ? 'text-accent font-semibold'
                                                : 'text-secondary hover:text-accent'
                                        }`}
                                    >
                                        Guild List
                                    </Link>
                                </div>
                            )}

                            <Link
                                href="/guild-menu/dashboard/add-guild"
                                className={`group flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors border-l-4 ${
                                    isAddGuildActive
                                        ? 'border-accent text-accent bg-accent/10'
                                        : 'border-transparent text-secondary hover:hover-bg'
                                }`}
                            >
                                <IoIosAddCircleOutline
                                    className={`${
                                        isAddGuildActive ? 'text-accent' : 'text-muted'
                                    }`}
                                    size={18}
                                />
                                <span>Add Guild</span>
                            </Link>
                        </div>
                    )}
                </div>

                {/* === Image Resources Group === */}
                {/* === Supporter Group === */}
                <div>
                    <button
                        type="button"
                        onClick={handleSupporterDropdown}
                        className={`cursor-pointer group flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors w-full text-left border-l-4 ${
                            pathname.startsWith('/supporter-menu/dashboard')
                                ? 'border-accent text-accent bg-accent/10'
                                : 'border-transparent text-secondary hover:hover-bg'
                        }`}
                    >
                        <AiOutlineDollar
                            className={`${
                                pathname.startsWith('/supporter-menu/dashboard')
                                    ? 'text-accent'
                                    : 'text-muted'
                            }`}
                            size={18}
                        />
                        <span>Supporter</span>
                        <i
                            className={`fa-solid fa-caret-down ml-auto text-xs transition-transform ${
                                openSupporter ? 'rotate-180' : ''
                            }`}
                        />
                    </button>

                    {openSupporter && (
                        <div className="pl-8 mt-2 space-y-1">
                            <button
                                type="button"
                                onClick={handleSupporterDashboardDropdown}
                                className={`cursor-pointer group flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors w-full text-left border-l-4 ${
                                    isSupporterDashboardPathActive
                                        ? 'border-accent text-accent bg-accent/10'
                                        : 'border-transparent text-secondary hover:hover-bg'
                                }`}
                            >
                                <RxDashboard
                                    className={`${
                                        isSupporterDashboardPathActive
                                            ? 'text-accent'
                                            : 'text-muted'
                                    }`}
                                    size={18}
                                />
                                <span>Dashboard</span>
                                <i
                                    className={`fa-solid fa-caret-down ml-auto text-xs transition-transform ${
                                        openSupporterDashboard ? 'rotate-180' : ''
                                    }`}
                                />
                            </button>

                            {openSupporterDashboard && (
                                <div className="pl-8 mt-1 space-y-1">
                                    <Link
                                        href="/supporter-menu/dashboard"
                                        className={`block rounded-lg px-0 py-2 text-sm transition-colors ${
                                            isSupporterAnalyticActive
                                                ? 'text-accent font-semibold'
                                                : 'text-secondary hover:text-accent'
                                        }`}
                                    >
                                        Analytic
                                    </Link>
                                    <Link
                                        href="/supporter-menu/dashboard/supporter-list"
                                        className={`block rounded-lg px-0 py-2 text-sm transition-colors ${
                                            isSupporterListActive
                                                ? 'text-accent font-semibold'
                                                : 'text-secondary hover:text-accent'
                                        }`}
                                    >
                                        Supporter List
                                    </Link>
                                    <Link
                                        href="/supporter-menu/dashboard/support-requests"
                                        className={`block rounded-lg px-0 py-2 text-sm transition-colors ${
                                            isSupportRequestsActive
                                                ? 'text-accent font-semibold'
                                                : 'text-secondary hover:text-accent'
                                        }`}
                                    >
                                        Support Requests
                                    </Link>
                                </div>
                            )}

                            <Link
                                href="/supporter-menu/dashboard/add-supporter"
                                className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors border-l-4 ${
                                    isAddSupporterActive
                                        ? 'border-accent text-accent bg-accent/10'
                                        : 'border-transparent text-secondary hover:hover-bg'
                                }`}
                            >
                                <IoIosAddCircleOutline
                                    className={`${
                                        isAddSupporterActive ? 'text-accent' : 'text-muted'
                                    }`}
                                    size={18}
                                />
                                Add Supporter
                            </Link>
                        </div>
                    )}
                </div>

                <div>
                    <button
                        type="button"
                        onClick={handleImagesDropdown}
                        className={`cursor-pointer group flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors w-full text-left border-l-4 ${
                            pathname.startsWith('/images-menu/dashboard')
                                ? 'border-accent text-accent bg-accent/10'
                                : 'border-transparent text-secondary hover:hover-bg'
                        }`}
                    >
                        <MdImage
                            className={`${
                                pathname.startsWith('/images-menu/dashboard')
                                    ? 'text-accent'
                                    : 'text-muted'
                            }`}
                            size={18}
                        />
                        <span>Image Resources</span>
                        <i
                            className={`fa-solid fa-caret-down ml-auto text-xs transition-transform ${
                                openImages ? 'rotate-180' : ''
                            }`}
                        />
                    </button>

                    {openImages && (
                        <div className="pl-8 mt-2 space-y-1">
                            <button
                                type="button"
                                onClick={handleImagesDashboardDropdown}
                                className={`cursor-pointer group flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors w-full text-left border-l-4 ${
                                    isImagesDashboardActive
                                        ? 'border-accent text-accent bg-accent/10'
                                        : 'border-transparent text-secondary hover:hover-bg'
                                }`}
                            >
                                <RxDashboard
                                    className={`${
                                        isImagesDashboardActive
                                            ? 'text-accent'
                                            : 'text-muted'
                                    }`}
                                    size={18}
                                />
                                <span>Dashboard</span>
                                <i
                                    className={`fa-solid fa-caret-down ml-auto text-xs transition-transform ${
                                        openImagesDashboard ? 'rotate-180' : ''
                                    }`}
                                />
                            </button>

                            {openImagesDashboard && (
                                <div className="pl-8 mt-1 space-y-1">
                                     <Link
                                        href="/images-menu/dashboard"
                                        className={`block rounded-lg px-0 py-2 text-sm transition-colors ${
                                            isImagesAnalyticActive
                                                ? 'text-accent font-semibold'
                                                : 'text-secondary hover:text-accent'
                                        }`}
                                    >
                                        Analytic
                                    </Link>
                                    <Link
                                        href="/images-menu/dashboard/images-list"
                                        className={`block rounded-lg px-0 py-2 text-sm transition-colors ${
                                            isImagesActive
                                                ? 'text-accent font-semibold'
                                                : 'text-secondary hover:text-accent'
                                        }`}
                                    >
                                        Images
                                    </Link>
                                </div>
                            )}

                            <Link
                                href="/images-menu/dashboard/add-image"
                                className={`group flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors border-l-4 ${
                                    isAddImageActive
                                        ? 'border-accent text-accent bg-accent/10'
                                        : 'border-transparent text-secondary hover:hover-bg'
                                }`}
                            >
                                <IoIosAddCircleOutline
                                    className={`${
                                        isAddImageActive ? 'text-accent' : 'text-muted'
                                    }`}
                                    size={18}
                                />
                                <span>Add Image</span>
                                </Link>
                        </div>
                    )}
                </div>
            </nav>
        </>
    )

    return (
        <>
            {/* Desktop sidebar */}
            <aside className="hidden md:flex md:flex-col fixed inset-y-0 left-0 w-64 sidebar-bg sidebar-border border-r">
                {content}
            </aside>

            {/* Mobile drawer */}
            {isOpen ? (
                <div className="md:hidden fixed inset-0 z-50">
                    <div
                        className="cursor-pointer absolute inset-0 overlay-bg"
                        onClick={onClose}
                    />
                    <div className="absolute inset-y-0 left-0 w-64 sidebar-bg sidebar-border border-r animate-[slideIn_.2s_ease-out]">
                        {content}
                    </div>
                    <style jsx global>{`
                        @keyframes slideIn {
                            from {
                                transform: translateX(-100%);
                            }
                            to {
                                transform: translateX(0);
                            }
                        }
                    `}</style>
                </div>
            ) : null}
        </>
    )
}