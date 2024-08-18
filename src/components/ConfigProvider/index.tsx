'use client';
import { useColorMode } from "@/hooks/useColorMode"
import { AppDispatch } from "@/redux"
import { FC, ReactNode } from "react"
import { useQuery } from "react-query"
import { useDispatch } from "react-redux"
import config from "../../../config"
import { QueryKey } from "@/types/api"
import { ThemeConfig, ZAppModel } from "@/models"
import { zappService } from "@/services/zappService"
import { LOCAL_STORAGE } from "@/constants"
import { setThemeConfig } from "@/redux/slices/themeConfig-slice"

export const ConfigProvider: FC<{
  children: ReactNode
}> = ({ children }) => {
  const dispatch = useDispatch<AppDispatch>()

  //useColorMode()

  useQuery({
    queryKey: [QueryKey.ZAPP, config.APP_ID],
    queryFn: async () => {
      let appConfig: ZAppModel = {}

      try {
        appConfig = await zappService.getAppConfig()
        localStorage.setItem(
          LOCAL_STORAGE.THEME_CONFIG,
          JSON.stringify(appConfig) || '{}',
        )
      } catch (err) {
        appConfig = JSON.parse(
          localStorage.getItem(LOCAL_STORAGE.THEME_CONFIG) || '{}',
        )
      }
      dispatch(setThemeConfig(appConfig as ThemeConfig))
      const { light, dark } = (
        appConfig?.themeConfig ? JSON.parse(appConfig?.themeConfig) : {}
      ) as ThemeConfig

      const { color, article, category, product, slider } = light || {}

      const {
        background,
        border,
        default: defaultColor,
        foreground,
        mix,
        primary,
        secondary,
        text,
      } = color || {}

      const cssVariables: Record<string, string | undefined | number> = {
        '--bg-header': primary,
        '--zmp-primary-color': primary,
        '--zaui-light-option-selected-color': primary,
        '--primary-light-color': primary,//
        '--secondary-light-color': secondary,//
        '--primary-opacity-light-color': `${primary}1a`,
        '--background-light-color': background,//
        '--foreground-light-color': foreground,//
        '--default-light-color': defaultColor,//
        '--text-light-color': text,//
        '--gray-light-color': border,
        '--white-light-color': mix,

        // slider config
        '--slider-aspect-light': `${(Number(slider?.height) / Number(slider?.width || 1)) * 100}%`,
        '--slider-border-radius-light': `${slider?.radius}px`,
        '--slider-border-width-light': slider?.borderWidth,
        '--slider-border-color-light': slider?.borderColor,

        // product config
        '--product-aspect-light': `${(Number(product?.height) / Number(product?.width || 1)) * 100}%`,
        '--product-border-radius-light': `${product?.radius}px`,
        '--product-border-width-light': product?.borderWidth,
        '--product-border-color-light': product?.borderColor,

        // category config
        '--category-aspect-light': `${(Number(category?.height) / Number(category?.width || 1)) * 100}%`,
        '--category-border-radius-light': `${category?.radius}px`,
        '--category-border-width-light': `${category?.borderWidth}px`,
        '--category-border-color-light': category?.borderColor,

        // article config
        '--article-aspect-light': `${(Number(article?.width) / Number(article?.height || 1)) * 100}%`,
        '--article-border-radius-light': `${article?.radius}px`,
        '--article-border-width-light': article?.borderWidth,
        '--article-border-color-light': article?.borderColor,
      }

      //primary && zaloService.changeStatusBarColor(primary)

      Object.keys(cssVariables)
        .filter((cv) => cssVariables[cv])
        .forEach((cv) => {
          document.documentElement.style.setProperty(
            cv,
            String(cssVariables[cv]),
          )
        })

      //await zaloService.closeLoadingScreen()
    },
    refetchOnWindowFocus: false,
  })

  return <>{children}</>
}
