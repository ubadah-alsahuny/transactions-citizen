type ModalProps = {
    isOpen: boolean
    title?: string
    children: React.ReactNode
    onClose: () => void
}

export default function Modal({
                                  isOpen,
                                  title,
                                  children,
                                  onClose
                              }: ModalProps) {
    if (!isOpen) return null

    return (
        <div className="modal-backdrop">
            <div className="modal">
                {title && <h3>{title}</h3>}
                <div>{children}</div>
                <button onClick={onClose}>Close</button>
            </div>
        </div>
    )
}
