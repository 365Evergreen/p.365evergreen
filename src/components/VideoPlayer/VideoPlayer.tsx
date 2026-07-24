import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
    Button,
    Tooltip
} from '@fluentui/react-components';

import {
    Play24Regular,
    Pause24Regular,
    ArrowReset24Regular,
    FullScreenMaximize24Regular,
    FullScreenMinimize24Regular,
    PanelLeftExpand24Regular,
    PanelLeftContract24Regular,
    ArrowReply24Regular,
    ArrowForward24Regular
} from '@fluentui/react-icons';

import { useAppStyles } from '../../styles/appStyles';

export interface VideoPlayerProps {
    src: string;
    poster?: string;
    title?: string;
    autoPlay?: boolean;
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({
    src,
   // poster,
    title,
 //   autoPlay = false
}) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);

    const [playing, setPlaying] = useState(false);
    const [fullscreen, setFullscreen] = useState(false);
    const [theatreMode, setTheatreMode] = useState(false);

    useEffect(() => {
        const video = videoRef.current;

        if (!video) return;

        const handlePlay = () => setPlaying(true);
        const handlePause = () => setPlaying(false);

        video.addEventListener('play', handlePlay);
        video.addEventListener('pause', handlePause);

        return () => {
            video.removeEventListener('play', handlePlay);
            video.removeEventListener('pause', handlePause);
        };
    }, []);

    useEffect(() => {
        const handleFullscreenChange = () => {
            setFullscreen(!!document.fullscreenElement);
        };

        document.addEventListener(
            'fullscreenchange',
            handleFullscreenChange
        );

        return () => {
            document.removeEventListener(
                'fullscreenchange',
                handleFullscreenChange
            );
        };
    }, []);

    const togglePlayPause = useCallback(async () => {
        const video = videoRef.current;

        if (!video) return;

        if (video.paused) {
            await video.play();
        } else {
            video.pause();
        }
    }, []);

    const restart = useCallback(async () => {
        const video = videoRef.current;

        if (!video) return;

        video.currentTime = 0;
        await video.play();
    }, []);

    const skipForward = useCallback(() => {
        const video = videoRef.current;

        if (!video) return;

        video.currentTime = Math.min(
            video.duration,
            video.currentTime + 10
        );
    }, []);

    const skipBack = useCallback(() => {
        const video = videoRef.current;

        if (!video) return;

        video.currentTime = Math.max(
            0,
            video.currentTime - 10
        );
    }, []);

    const toggleTheatreMode = useCallback(() => {
        setTheatreMode(prev => !prev);
    }, []);

    const toggleFullscreen = useCallback(async () => {
        const container = containerRef.current;

        if (!container) return;

        if (!document.fullscreenElement) {
            await container.requestFullscreen();
        } else {
            await document.exitFullscreen();
        }
    }, []);

    useEffect(() => {
        const handleKeyDown = async (
            event: KeyboardEvent
        ) => {
            const target = event.target as HTMLElement;

            if (
                target.tagName === 'INPUT' ||
                target.tagName === 'TEXTAREA' ||
                target.isContentEditable
            ) {
                return;
            }

            switch (event.code) {
                case 'Space':
                    event.preventDefault();
                    await togglePlayPause();
                    break;

                case 'ArrowLeft':
                    event.preventDefault();
                    skipBack();
                    break;

                case 'ArrowRight':
                    event.preventDefault();
                    skipForward();
                    break;

                case 'KeyF':
                    await toggleFullscreen();
                    break;

                case 'KeyT':
                    toggleTheatreMode();
                    break;

                case 'Home':
                    if (videoRef.current) {
                        videoRef.current.currentTime = 0;
                    }
                    break;

                case 'End':
                    if (videoRef.current) {
                        videoRef.current.currentTime =
                            videoRef.current.duration;
                    }
                    break;

                default:
                    break;
            }
        };

        window.addEventListener(
            'keydown',
            handleKeyDown
        );

        return () => {
            window.removeEventListener(
                'keydown',
                handleKeyDown
            );
        };
    }, [
        togglePlayPause,
        skipBack,
        skipForward,
        toggleFullscreen,
        toggleTheatreMode
    ]);

    return (
        <div
            ref={containerRef}
            className={useAppStyles().videoPlayerContainer}
        >
            {src}

            <div className={useAppStyles().videoToolbar}>
                <div className={useAppStyles().videoToolbarLeft}>
                    <Tooltip
                        content="Play / Pause (Space)"
                        relationship="label"
                    >
                        <Button
                            appearance="subtle"
                            icon={
                                playing
                                    ? <Pause24Regular />
                                    : <Play24Regular />
                            }
                            onClick={togglePlayPause}
                        />
                    </Tooltip>

                    <Tooltip
                        content="Back 10 Seconds (←)"
                        relationship="label"
                    >
                        <Button
                            appearance="subtle"
                            icon={<ArrowReply24Regular />}
                            onClick={skipBack}
                        />
                    </Tooltip>

                    <Tooltip
                        content="Forward 10 Seconds (→)"
                        relationship="label"
                    >
                        <Button
                            appearance="subtle"
                            icon={<ArrowForward24Regular />}
                            onClick={skipForward}
                        />
                    </Tooltip>

                    <Tooltip
                        content="Restart"
                        relationship="label"
                    >
                        <Button
                            appearance="subtle"
                            icon={<ArrowReset24Regular />}
                            onClick={restart}
                        />
                    </Tooltip>
                </div>

                <div className={useAppStyles().videoToolbarTitle}>
                    {title}
                </div>

                <div className={useAppStyles().videoToolbarRight}>
                    <Tooltip
                        content="Theatre Mode (T)"
                        relationship="label"
                    >
                        <Button
                            appearance="subtle"
                            icon={
                                theatreMode
                                    ? <PanelLeftContract24Regular />
                                    : <PanelLeftExpand24Regular />
                            }
                            onClick={toggleTheatreMode}
                        />
                    </Tooltip>

                    <Tooltip
                        content="Fullscreen (F)"
                        relationship="label"
                    >
                        <Button
                            appearance="subtle"
                            icon={
                                fullscreen
                                    ? <FullScreenMinimize24Regular />
                                    : <FullScreenMaximize24Regular />
                            }
                            onClick={toggleFullscreen}
                        />
                    </Tooltip>
                </div>
            </div>
        </div>
    );
};
export default VideoPlayer;