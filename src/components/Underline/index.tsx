export type UnderlineProps = {
  className: string
}

export const Underline: React.FC<UnderlineProps> = ({
  className,
}) => ( 
  <svg className={className} xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" viewBox="0 0 103 5" width="100%" height="5">
    <g transform="translate(-2480.55 -2304.574)">
      <line y1="2.66" x2="96.231" transform="translate(2484.07 2305.826)"/>
      <g transform="translate(2480.55 2302.779)">
        <path d="M2489.613,2309.721l32.389-.254,48.613.254,11.64-.254c2.706-.059,1.231-2.8.551-3.572-1.177-1.329-5.76-1.364-8.522-1.3h-80.527l-11.64.254c-2.7.06-1.231,2.8-.551,3.572,1.177,1.329,5.286,1.365,8.048,1.3Z" transform="translate(-2480.55 -2302.779)"/>
      </g>
    </g>
  </svg>
)
