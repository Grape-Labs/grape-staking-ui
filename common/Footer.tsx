import { darken, lighten } from 'polished'
import { FaDiscord, FaGithub, FaMedium, FaTwitter } from 'react-icons/fa'
import { contrastColorMode, hexColor } from './utils'

const SOCIALS = {
  discord: { icon: <FaDiscord />, link: 'https://discord.gg/zcdVDtgd' },
  github: { icon: <FaGithub />, link: 'https://github.com/grape-labs' },
  twitter: { icon: <FaTwitter />, link: 'https://twitter.com/grapeprotocol' },
}

export const Footer = ({
  bgColor = 'rgb(26, 27, 32)',
  accentColor = '#FFFFFF',
}: {
  bgColor?: string
  accentColor?: string
}) => {
  return (
    <div
      className="mt-10 px-10 pt-5 md:px-32"
      style={{
        background: darken(0.03, bgColor),
      }}
    >
      <div className="flex w-full flex-wrap items-start justify-between gap-10 py-10">
        <div className="flex items-center">
          <img
            className="inline-block h-[28px]"
            src={
              contrastColorMode(bgColor)[1]
                ? '/grape_logo.svg'
                : '/grape_logo.svg'
            }
          />
          <span
            className="ml-3 text-2xl font-semibold"
            style={{ color: lighten(0.4, contrastColorMode(bgColor)[0]) }}
          >
            -
          </span>
        </div>
        <div className="flex gap-10 self-end text-center md:gap-20">
          <span className="flex flex-col items-start gap-1">
            <div
              className="mb-2 text-lg font-semibold"
              style={{ color: lighten(0.4, contrastColorMode(bgColor)[0]) }}
            >
              App
            </div>
            <a href="/" className="text-gray-400">
              Pools
            </a>
            <a href="/admin" className="text-gray-400">
              Admin
            </a>
          </span>
        </div>
      </div>
      <div
        className="text-md flex items-center justify-between border-t py-8 text-gray-400"
        style={{ borderColor: lighten(0.2, bgColor) }}
      >
        <div className="flex items-center justify-center gap-2 text-gray-400">
          Grape Staking UI powered by Cardinal
        </div>
        <div className="flex gap-4 text-gray-200">
          {Object.entries(SOCIALS).map(([id, { icon, link }]) => {
            return (
              <a
                key={id}
                href={link}
                target="_blank"
                rel="noreferrer"
                style={{ color: accentColor }}
                className={`hover:text-primary opacity-80 transition-opacity hover:opacity-100`}
              >
                {icon}
              </a>
            )
          })}
        </div>
      </div>
      {/* <div className="text-md flex flex-row justify-center font-medium">
        Copyright 2022 Cardinal Labs. All rights reserved
      </div> */}
    </div>
  )
}
