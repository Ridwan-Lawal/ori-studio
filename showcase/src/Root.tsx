import { Composition, Still } from "remotion";
import { OriStudioShowcase, OriStudioCover } from "./Composition";

export const RemotionRoot = () => (
  <>
    <Composition
      id="OriStudioShowcase"
      component={OriStudioShowcase}
      width={1080}
      height={1920}
      fps={30}
      durationInFrames={750}
    />
    <Still
      id="OriStudioCover"
      component={OriStudioCover}
      width={1080}
      height={1920}
    />
  </>
);
