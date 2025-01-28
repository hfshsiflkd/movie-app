

export default function Home() {
  return (
    <div className="absolute inset-0  flex items-center justify-center overflow-hidden underline bg-white">
      <div className="absolute w-[140px] h-[140px] border  border-customBorder rounded-full bg-customWhite z-20 flex space-x-4 justify-center items-center">
        <img
          src={"./img/leftlogo.png"}
          style={{ width: "43px", height: "86px" }}
          className="z-30"
        />
        <img
          src={"./img/rigthlogo.png"}
          style={{ width: "43px", height: "86px" }}
          className="z-30"
        />
      </div>
      <div className="absolute w-[80px] h-[64px] mt-[180px] ml-[80px]  bg-customWhite flex">
        <div className=" w-[40px] h-[64px] rounded-tl-full bg-customDark  "></div>
        <div className=" w-[40px] h-[64px] bg-customDark  "></div>
      </div>
      <div className="absolute w-[80px] h-[64px] mb-[180px] ml-[80px]  bg-customWhite flex">
        <div className=" w-[40px] h-[64px] rounded-bl-full bg-customDark  "></div>
        <div className=" w-[40px] h-[64px] bg-customDark  "></div>
      </div>
      <div className="absolute w-[140px] h-[140px] border border-customBorder rounded-full "></div>
      <div className="absolute w-[340px] h-[340px] border border-customBorder rounded-full "></div>
      <div className="absolute w-[540px] h-[540px] border border-customBorder rounded-full"></div>
      <div className="absolute w-[940px] h-[940px] border border-customBorder rounded-full"></div>
      <div className="absolute w-[1340px] h-[1340px] border border-customBorder rounded-full"></div>
    </div>
    
        
  );
}
