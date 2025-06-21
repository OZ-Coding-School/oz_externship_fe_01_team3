import React from "react";

type SocialButtonProps = {
    bgColor: string;
    iconSrc: string;
    iconAlt: string;
    children: React.ReactNode
    marginBottom?: string | number;
    onClick?: () => void;
    txtColor: string
}

export default function SocialButton({
    bgColor,
    iconSrc,
    iconAlt,
    children,
    marginBottom,
    onClick,
    txtColor
}: SocialButtonProps) {

    return (
        <button
          onClick={onClick}
          style={{
            backgroundColor: bgColor,
            width: "348px",
            height: "52px",
            borderRadius: "4px",
            padding: "8px",
            color: txtColor,
            marginBottom: marginBottom,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "10px",
          }}
        >
          <img src={iconSrc} alt={iconAlt} />
          {children}
        </button>
      );


}