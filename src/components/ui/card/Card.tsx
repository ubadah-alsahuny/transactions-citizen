import React from "react";
import {Button} from "@/components/ui/button/Button.tsx";
import styles from '@/styles/ui/card/card.module.css';

type CardVariant = 'user' | 'organization' | 'service'
type CardType = 'vertical' | 'horizontal'

type CardProps = {
    width?: string,
    height: string,
    children: React.ReactNode
    image?: React.ReactNode
    buttonLabel?: React.ReactNode
    buttonIcon?: React.ReactNode
    onButtonClick?: () => void
    variant?: CardVariant
    type: CardType
    className?: string // Appends custom individual overrides cleanly
}

export function Card ({
                          width,
                          height,
                          children,
                          image,
                          buttonLabel,
                          buttonIcon,
                          onButtonClick,
                          type,
                          className = ''
                      }: CardProps) {
    return (
        <div
            className={`${styles.card_container} ${type === 'vertical' ? styles.vertical : styles.horizontal} ${className}`}
            style={{width, height}}
        >
            {image && (
                <div className={`${styles.image_container} ${type === 'vertical' ? styles.img_vertical : styles.img_horizontal}`}>
                    <img src={image} alt={"card_image"} className={styles.image_settings}/>
                </div>
            )}

            <div className={styles.body_container}>
                {children}
            </div>

            {(buttonLabel != null || buttonIcon != null) && (
                <div className={styles.button_container}>
                    <Button variant={'card'} onClick={onButtonClick}>
                        <div>
                            {buttonLabel}
                            {buttonIcon}
                        </div>
                    </Button>
                </div>
            )}
        </div>
    )
}