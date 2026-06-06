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
}

export function Card ({
                          width = '30%',
                          height,
                          children,
                          image,
                          buttonLabel,
                          buttonIcon,
                          onButtonClick,
                          type
                      }: CardProps) {
    return (
        <div className={styles.card_container} style={{width, height, flexDirection: type == 'vertical' ? "column" : "row"}}>
            <div
                className={styles.image_container}
                style={{width: type == 'vertical'
                        ?
                        "100%"
                        :
                        "25%"
            }}>
                { image ?
                <img src={image} alt={"card_image"} className={styles.image_settings}/> : null}
            </div>
            <div style={
                {

                    display: 'flex',
                    flex: 'wrap',
                    flexDirection: 'column',
                    placeContent: 'center'}}
            >
                {children}
        </div>
            {buttonLabel != null || buttonIcon != null
                ?
                <div style={{placeItems: 'end'}}>
                    <Button
                        variant={'card'}
                        children={
                            <div>
                                {buttonLabel}
                                {buttonIcon}
                            </div>
                        }
                        onClick={onButtonClick}/>
                </div>
                :
                ""}
        </div>
    )
}