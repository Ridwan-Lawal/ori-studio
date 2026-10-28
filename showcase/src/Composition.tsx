import {
  AbsoluteFill,
  CanvasImage,
  Easing,
  Sequence,
  Track,
  interpolate,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { Video } from "@remotion/media";
import { loadFont } from "@remotion/fonts";
import type { CSSProperties, ReactNode } from "react";

await Promise.all([
  loadFont({
    family: "Instrument Serif",
    url: staticFile("fonts/instrument-serif.woff2"),
    weight: "400",
  }),
  loadFont({
    family: "Instrument Serif",
    url: staticFile("fonts/instrument-serif-italic.woff2"),
    weight: "400",
    style: "italic",
  }),
  loadFont({
    family: "Manrope",
    url: staticFile("fonts/manrope.woff2"),
    weight: "400 700",
  }),
]);

const colors = {
  forest: "#20382E",
  ivory: "#F3EFE7",
  ink: "#1F231E",
  clay: "#91432D",
  sage: "#B7C0AD",
  surface: "#EEE8DD",
};
const ease = Easing.bezier(0.16, 1, 0.3, 1);
const clamp = {
  extrapolateLeft: "clamp",
  extrapolateRight: "clamp",
  easing: ease,
} as const;
const serif: CSSProperties = {
  fontFamily: "Instrument Serif",
  fontWeight: 400,
  letterSpacing: "-0.025em",
  lineHeight: 1.02,
  margin: 0,
};

function Frame({
  children,
  dark = false,
}: {
  children: ReactNode;
  dark?: boolean;
}) {
  return (
    <AbsoluteFill
      style={{
        background: dark ? colors.forest : colors.ivory,
        color: dark ? colors.ivory : colors.ink,
        fontFamily: "Manrope",
        overflow: "hidden",
      }}
    >
      {children}
      <div
        style={{
          position: "absolute",
          left: 88,
          top: 148,
          ...serif,
          fontSize: 56,
        }}
      >
        ORÍ Studio
      </div>
      <div
        style={{
          position: "absolute",
          right: 148,
          top: 170,
          fontSize: 30,
          fontWeight: 500,
          color: dark ? colors.sage : colors.clay,
        }}
      >
        Website concept
      </div>
      <div
        style={{
          position: "absolute",
          left: 88,
          top: 1670,
          fontSize: 32,
          color: dark ? colors.sage : colors.clay,
        }}
      >
        Fictional portfolio · No real appointments
      </div>
    </AbsoluteFill>
  );
}

function Heading({
  children,
  top = 305,
  size = 110,
  width = 850,
  still = false,
}: {
  children: ReactNode;
  top?: number;
  size?: number;
  width?: number;
  still?: boolean;
}) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <h1
      style={{
        ...serif,
        position: "absolute",
        left: 88,
        top,
        width,
        fontSize: size,
        translate: still
          ? "0px 0px"
          : interpolate(frame, [0, 0.65 * fps], ["0px 22px", "0px 0px"], clamp),
        opacity: still
          ? 1
          : interpolate(frame, [0, 0.35 * fps], [0.75, 1], clamp),
      }}
    >
      {children}
    </h1>
  );
}

function Screenshot({
  src,
  left,
  top,
  width,
  height,
  pan = 0,
}: {
  src: string;
  left: number;
  top: number;
  width: number;
  height: number;
  pan?: number;
}) {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  return (
    <div
      style={{
        position: "absolute",
        left,
        top,
        width,
        height,
        overflow: "hidden",
        background: colors.surface,
      }}
    >
      <CanvasImage
        src={staticFile("media/stills/" + src)}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: "top",
          translate: interpolate(
            frame,
            [0, durationInFrames],
            ["0px 0px", `0px ${-pan}px`],
            clamp,
          ),
        }}
      />
    </div>
  );
}

// Media clips have their loading lead-in removed, but their real browser actions remain untouched.
function Recording({
  src,
  left = 88,
  top = 640,
  width = 904,
  height = 628,
}: {
  src: string;
  left?: number;
  top?: number;
  width?: number;
  height?: number;
}) {
  return (
    <div
      style={{
        position: "absolute",
        left,
        top,
        width,
        height,
        overflow: "hidden",
        background: colors.ivory,
      }}
    >
      <Video
        src={staticFile("media/clips/" + src)}
        muted
        maxCanvasSinkFrameSize={{ width }}
        objectFit="contain"
        style={{ width: "100%", height: "100%" }}
      />
    </div>
  );
}

export function Opening() {
  return (
    <Frame>
      <Heading top={310} size={118}>
        What if your salon
        <br />
        had a website
        <br />
        like <i>this?</i>
      </Heading>
      <Screenshot
        src="home-1440.png"
        left={88}
        top={790}
        width={904}
        height={628}
        pan={8}
      />
    </Frame>
  );
}

export function Homepage() {
  const { fps } = useVideoConfig();
  return (
    <Frame>
      <Heading size={108}>
        A considered
        <br />
        <i>first impression.</i>
      </Heading>
      <Recording src="home-desktop.mp4" top={600} />
      <Sequence
        from={0.6 * fps}
        durationInFrames={5.4 * fps}
        name="Mobile responsive footage"
        layout="none"
      >
        <Recording
          src="home-mobile.mp4"
          left={572}
          top={950}
          width={370}
          height={685}
        />
      </Sequence>
      <p
        style={{
          position: "absolute",
          left: 88,
          top: 1350,
          fontSize: 44,
          lineHeight: 1.4,
          margin: 0,
        }}
      >
        Desktop.
        <br />
        Mobile.
        <br />
        Considered.
      </p>
    </Frame>
  );
}

export function ServicesScene() {
  return (
    <Frame>
      <Heading>
        Services,
        <br />
        <i>made clear.</i>
      </Heading>
      <Recording src="services-desktop.mp4" top={640} />
      <p
        style={{
          position: "absolute",
          left: 88,
          top: 1390,
          fontSize: 44,
          lineHeight: 1.4,
          margin: 0,
        }}
      >
        Explore the care.
        <br />
        Choose a service.
      </p>
    </Frame>
  );
}

export function LookbookScene() {
  return (
    <Frame dark>
      <Heading>
        Room for
        <br />
        <i>inspiration.</i>
      </Heading>
      <Recording src="lookbook-desktop.mp4" top={640} />
      <p
        style={{
          position: "absolute",
          left: 88,
          top: 1390,
          fontSize: 44,
          lineHeight: 1.4,
          margin: 0,
        }}
      >
        Discover styles.
        <br />
        Filter the lookbook.
      </p>
    </Frame>
  );
}

export function BookingScene() {
  return (
    <Frame>
      <Heading top={285} size={100}>
        A booking journey.
        <br />
        <i>Built to preview.</i>
      </Heading>
      <Recording
        src="booking-mobile.mp4"
        left={110}
        top={590}
        width={780}
        height={1050}
      />
      <p
        style={{
          position: "absolute",
          left: 88,
          top: 510,
          fontSize: 36,
          width: 850,
          color: colors.clay,
          margin: 0,
        }}
      >
        Concept demo — no real booking or submission.
      </p>
    </Frame>
  );
}

export function Closing({ poster = false }: { poster?: boolean }) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <Frame dark>
      <Heading top={300} size={112} still={poster}>
        I build websites
        <br />
        for <i>businesses.</i>
      </Heading>
      <p
        style={{
          position: "absolute",
          left: 88,
          top: 640,
          fontSize: 48,
          lineHeight: 1.35,
          margin: 0,
          translate: poster
            ? "0px 0px"
            : interpolate(
                frame,
                [0.15 * fps, 0.7 * fps],
                ["0px 14px", "0px 0px"],
                clamp,
              ),
        }}
      >
        Have a project? DM me.
      </p>
      <Screenshot
        src="home-1440.png"
        left={88}
        top={1000}
        width={904}
        height={628}
      />
      <Screenshot
        src="home-390.png"
        left={110}
        top={790}
        width={370}
        height={820}
      />
    </Frame>
  );
}

export const OriStudioShowcase = () => {
  const { fps } = useVideoConfig();
  return (
    <AbsoluteFill style={{ background: colors.ivory }}>
      <Track name="ORÍ Studio — first showcase">
        <Sequence name="01 — Opening hook" durationInFrames={3 * fps}>
          <Opening />
        </Sequence>
        <Sequence
          name="02 — Desktop and mobile homepage"
          from={3 * fps}
          durationInFrames={6 * fps}
        >
          <Homepage />
        </Sequence>
        <Sequence
          name="03 — Services"
          from={9 * fps}
          durationInFrames={3 * fps}
        >
          <ServicesScene />
        </Sequence>
        <Sequence
          name="03 — Lookbook"
          from={12 * fps}
          durationInFrames={3 * fps}
        >
          <LookbookScene />
        </Sequence>
        <Sequence
          name="04 — Real booking preview"
          from={15 * fps}
          durationInFrames={6 * fps}
        >
          <BookingScene />
        </Sequence>
        <Sequence
          name="05 — Developer CTA"
          from={21 * fps}
          durationInFrames={4 * fps}
        >
          <Closing />
        </Sequence>
      </Track>
    </AbsoluteFill>
  );
};

export const OriStudioCover = () => <Closing poster />;
