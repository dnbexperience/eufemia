import IconPrimary from '../icon-primary/IconPrimary'

export const getCloseCircleIcon = (title?: string) => (
  <IconPrimary
    title={title}
    inheritColor={false}
    icon={
      <svg
        width="16"
        height="16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0 8a8 8 0 1 1 16 0A8 8 0 1 1 0 8Z"
          className="dnb-icon-close-circle-path"
        />
        <path
          d="m5.5 10.5 5-5m0 5-5-5"
          className="dnb-icon-close-cross-path"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    }
  />
)
