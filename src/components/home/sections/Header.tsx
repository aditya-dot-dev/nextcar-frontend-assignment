import React from 'react';
import Image from 'next/image';
import { FlowState } from '../hooks/useTimelineFlow';

interface HeaderProps {
  setFlowState: (state: FlowState) => void;
}

export default function Header({ setFlowState }: HeaderProps) {
  return (
    <>
      {/* 2. HEADER */}
      {/* Brand logo (top-left) */}
      <div className="absolute left-8 top-4 z-20">
        <Image
          src="/assets/icons/brand_logo.svg"
          alt="NextCar"
          width={110}
          height={32}
          priority
          className="h-auto w-auto opacity-90"
        />
      </div>

      {/* Back button below logo */}
      <button
        type="button"
        className="absolute left-8 top-[88px] z-20 flex transition-transform hover:scale-105"
      >
        <Image
          src="/assets/icons/back_icon.svg"
          alt="Back"
          width={40}
          height={40}
        />
      </button>

      {/* Top-right theme toggle */}
      <div className="absolute right-8 top-6 z-20">
        <div
          className="flex items-center rounded-full bg-white/5 border border-white/10 p-1 backdrop-blur-md"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Sun icon / Light theme toggle */}
          <button
            type="button"
            className="flex h-8 w-8 items-center justify-center rounded-full text-white/40 hover:text-white transition-colors"
            title="Light mode"
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zm0 8c-1.65 0-3-1.35-3-3s1.35-3 3-3 3 1.35 3 3-1.35 3-3 3zM2 13h2c.55 0 1-.45 1-1s-.45-1-1-1H2c-.55 0-1 .45-1 1s.45 1 1 1zm18 0h2c.55 0 1-.45 1-1s-.45-1-1-1h-2c-.55 0-1 .45-1 1s.45 1 1 1zM11 2v2c0 .55.45 1 1 1s1-.45 1-1V2c0-.55-.45-1-1-1s-1 .45-1 1zm0 18v2c0 .55.45 1 1 1s1-.45 1-1v-2c0-.55-.45-1-1-1s-1 .45-1 1zM5.99 4.58c-.39-.39-1.03-.39-1.41 0s-.39 1.03 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0s.39-1.03 0-1.41L5.99 4.58zm12.37 12.37c-.39-.39-1.03-.39-1.41 0s-.39 1.03 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0s.39-1.03 0-1.41l-1.06-1.06zm1.06-12.37l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06c.39-.39.39-1.03 0-1.41s-1.03-.39-1.41 0zm-12.37 12.37l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06c.39-.39.39-1.03 0-1.41s-1.03-.39-1.41 0z" />
            </svg>
          </button>

          {/* Moon icon / Dark theme active state */}
          <button
            type="button"
            className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20 text-white shadow-sm"
            title="Dark mode"
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M12.3 2a10 10 0 0 0-1.9 20 10 10 0 0 0 8.7-4.9 1 1 0 0 0-1.1-1.5 8 8 0 1 1-7.2-12.5 1 1 0 0 0 1.5-1.1A10 10 0 0 0 12.3 2z" />
            </svg>
          </button>
        </div>
      </div>

      {/* Top-right action buttons (Download, Share, Check) */}
      <div className="absolute right-8 top-[88px] z-20 flex items-center gap-4">
        <button
          type="button"
          className="flex transition-transform hover:scale-105"
        >
          <Image
            src="/assets/icons/download_icon.svg"
            alt="Download"
            width={40}
            height={40}
          />
        </button>

        <button
          type="button"
          className="flex transition-transform hover:scale-105"
        >
          <Image
            src="/assets/icons/share_icon.svg"
            alt="Share"
            width={40}
            height={40}
          />
        </button>

        <button
          type="button"
          className="flex transition-transform hover:scale-105"
          onClick={() => {
            setFlowState(1);
            setTimeout(() => setFlowState(2), 600);
            setTimeout(() => setFlowState(3), 1200);
          }}
        >
          <Image
            src="/assets/icons/check_icon.svg"
            alt="Confirm"
            width={40}
            height={40}
          />
        </button>
      </div>
    </>
  );
}
