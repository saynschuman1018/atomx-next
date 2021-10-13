import React from 'react'

export type ToggleOpenerProps = {
  open: boolean
} & React.ComponentProps<'svg'>

const pathData = 'M193.633,151.123c6.179-6.557,2.307-2.606,4.687-5.051,1.158-1.194,1.688-1.6,2.878-2.766,1.259-1.227,1.277-.955,2.519-2.186a.321.321,0,0,0-.367-.513h0c-1.488.873-1.511.866-2.946,1.834a14.8,14.8,0,0,0-2.436,1.978c-2.588,2.282-4.963,5.271-4.963,6.183S193.633,151.123,193.633,151.123Z'
const horizontal = 'translate(3.83 -34.91)'
const vertical = 'translate(347.775 -87.083) rotate(90)'

export const ToggleOpener: React.FC<ToggleOpenerProps> = ({ open, ...props }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="18.585" height="18.092" viewBox="0 0 18.585 18.092" { ...props }>
      <g transform="translate(-55.009 -212.447) rotate(45)">
        <path
          d={pathData}
          transform={horizontal}
          fill="#ff6274"
          stroke="#ff6274"
          strokeWidth="2"
        />
        {!open && (
          <path
            d={pathData}
            transform={vertical}
            fill="#ff6274"
            stroke="#ff6274"
            strokeWidth="2"
          />
        )}
      </g>
    </svg>
  )
}