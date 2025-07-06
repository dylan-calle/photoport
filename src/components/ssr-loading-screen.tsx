export default function LoadingScreen() {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-[9997]">
      <div className="absolute inset-0 bg-black/70"></div>
      <div className="z-[9999]">
        <svg width="100" height="100" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="fill-white ">
          <rect x="1" y="1" rx="1" width="10" height="10">
            <animate
              id="spinner_FFyM"
              begin="0;spinner_HDCY.end"
              attributeName="x"
              dur="0.2s"
              values="1;13"
              fill="freeze"
            />
            <animate
              id="spinner_AIvE"
              begin="spinner_1FwE.end"
              attributeName="y"
              dur="0.2s"
              values="1;13"
              fill="freeze"
            />
            <animate
              id="spinner_wWCL"
              begin="spinner_gH4o.end"
              attributeName="x"
              dur="0.2s"
              values="13;1"
              fill="freeze"
            />
            <animate
              id="spinner_S3Gg"
              begin="spinner_Q0bx.end"
              attributeName="y"
              dur="0.2s"
              values="13;1"
              fill="freeze"
            />
          </rect>
          <rect x="1" y="13" rx="1" width="10" height="10">
            <animate
              id="spinner_1FwE"
              begin="spinner_FFyM.end"
              attributeName="y"
              dur="0.2s"
              values="13;1"
              fill="freeze"
            />
            <animate
              id="spinner_gH4o"
              begin="spinner_AIvE.end"
              attributeName="x"
              dur="0.2s"
              values="1;13"
              fill="freeze"
            />
            <animate
              id="spinner_Q0bx"
              begin="spinner_wWCL.end"
              attributeName="y"
              dur="0.2s"
              values="1;13"
              fill="freeze"
            />
            <animate
              id="spinner_HDCY"
              begin="spinner_S3Gg.end"
              attributeName="x"
              dur="0.2s"
              values="13;1"
              fill="freeze"
            />
          </rect>
        </svg>
        <span className="text-center block font-poppins mt-1">Loading...</span>
      </div>
    </div>
  );
}
