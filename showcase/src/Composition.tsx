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
          right: 182,
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
          top: 230,
          fontSize: 29,
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

// Refined edit: generous right/bottom clearance for social interface overlays.
function Caption({children}: {children: ReactNode}) {
  return <p style={{position: "absolute", left: 88, top: 1450, width: 810,
    fontSize: 38, lineHeight: 1.4, margin: 0}}>{children}</p>;
}
function MobileRecording({src}: {src: string}) {
  return <Recording src={"../refined/" + src} left={88} top={460} width={810} height={1142}/>;
}
export function Opening() {
  return <Frame>
    <Heading top={290} size={86}>What if your salon<br/>had a website like <i>this?</i></Heading>
    <Recording src="home-desktop.mp4" left={64} top={535} width={850} height={590}/>
    <Sequence from={1.8 * 30} durationInFrames={1.2 * 30} name="Responsive match cut" layout="none">
      <ResponsiveReveal/>
    </Sequence>
    <Caption>Desktop to mobile. Every detail considered.</Caption>
  </Frame>;
}
function ResponsiveReveal() {
  const frame=useCurrentFrame();const {fps}=useVideoConfig();
  return <div style={{position:"absolute",left: 430, top: 810, width:468,height: 625,
    translate:interpolate(frame,[0,0.35*fps],["0px 28px","0px 0px"],clamp),
    border:`8px solid ${colors.forest}`, background:colors.ivory}}>
    <Video src={staticFile("media/clips/home-mobile.mp4")} muted objectFit="cover" style={{width:"100%",height:"100%"}}/>
  </div>;
}
export function Homepage() {
  return <Frame>
    <Heading top={285} size={90}>A considered<br/><i>first impression.</i></Heading>
    <Recording src="home-mobile.mp4" left={88} top={510} width={810} height={1080}/>
  </Frame>;
}
export function ServicesScene() {
  return <Frame><Heading top={285} size={90}>Services, <i>made clear.</i></Heading>
    <MobileRecording src="services.mp4"/>
  </Frame>;
}
export function LookbookScene() {
  return <Frame dark><Heading top={285} size={90}>Find your <i>expression.</i></Heading>
    <MobileRecording src="lookbook.mp4"/>
  </Frame>;
}
export function BookingScene() {
  return <Frame><Heading top={270} size={83}>A booking journey.<br/><i>Built to preview.</i></Heading>
    <p style={{position:"absolute",left:88,top:440,width:810,fontSize:30,lineHeight:1.4,margin:0,color:colors.clay}}>Concept demo. Preferences only; nothing submitted.</p>
    <Recording src="../refined/booking.mp4" left={88} top={525} width={700} height={987}/>
  </Frame>;
}
export function Closing({poster=false}: {poster?:boolean}) {
  return <Frame dark>
    <Heading top={285} size={100} still={poster}>I build websites<br/>for <i>businesses.</i></Heading>
    <p style={{position:"absolute",left:88,top:530,fontSize:44,margin:0}}>Lawal Ridwan</p>
    <p style={{position:"absolute",left:88,top:610,fontSize:46,margin:0}}>Have a project? DM me.</p>
    <Screenshot src="home-1440.png" left={88} top={770} width={810} height={563}/>
    <p style={{position:"absolute",left:88,top:1400,width:810,fontSize:33,lineHeight:1.5,margin:0,color:colors.sage}}>ORÍ Studio is a fictional portfolio concept.<br/>No real appointments are accepted.</p>
  </Frame>;
}
export const OriStudioShowcase=()=>{
 const {fps}=useVideoConfig();
 return <AbsoluteFill style={{background:colors.ivory}}><Track name="ORÍ Studio — refined showcase">
  <Sequence name="01 — Website first / desktop to mobile" durationInFrames={3*fps}><Opening/></Sequence>
  <Sequence name="02 — Responsive homepage" from={3*fps} durationInFrames={3*fps}><Homepage/></Sequence>
  <Sequence name="03 — Readable services" from={6*fps} durationInFrames={3.5*fps}><ServicesScene/></Sequence>
  <Sequence name="04 — Real Lookbook filtering" from={9.5*fps} durationInFrames={4*fps}><LookbookScene/></Sequence>
  <Sequence name="05 — Date / time / review / demo" from={13.5*fps} durationInFrames={7.5*fps}><BookingScene/></Sequence>
  <Sequence name="06 — Lawal Ridwan / DM CTA" from={21*fps} durationInFrames={4*fps}><Closing/></Sequence>
 </Track></AbsoluteFill>;
};
export const OriStudioCover=()=> <Closing poster/>;
