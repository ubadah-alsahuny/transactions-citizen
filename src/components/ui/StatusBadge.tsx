type Status = 'pending' | 'approved' | 'rejected'

type StatusBadgeProps = {
    status: Status
}

export default function StatusBadge({ status }: StatusBadgeProps) {
    return (
        <span data-status={status}>
      {status.toUpperCase()}
    </span>
    )
}
