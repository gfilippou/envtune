log() {
  local message=$1
  local color=$2
  local standout=$3
  local filename=$(basename $0)
  
  if [[ "$standout" == "standout" ]]; then
    echo $'\e[34m'"--------------------------------------------------------------------------------------------"
    echo "[ $filename ] $message"
    echo "--------------------------------------------------------------------------------------------"
    echo $'\e[0m'
  else
    case $color in
      error)
        echo "[ $filename ] "$'\e[31m'"$message"$'\e[0m'
        ;;
      success)
        echo "[ $filename ] "$'\e[32m'"$message"$'\e[0m'
        ;;
      *)
        echo "[ $filename ] "$'\e[33m'"$message"$'\e[0m'
        ;;
    esac
  fi
}

# Usage examples:
# log "info message"
# log "success message" "success"
# log "error message" "error"
# log "Standout message" "" 1
