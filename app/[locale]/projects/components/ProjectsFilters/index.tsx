"use client";

import {
  useState,
  useEffect,
  useRef,
  useMemo,
  type ReactNode,
} from "react";
import { useTranslations } from "next-intl";
import Typography from "@/app/components/Typography";
import {
  ChevronDown,
  X,
  Briefcase,
  User,
  GraduationCap,
  Geodatin,
  Golfarma,
  UEFS,
  Unifacs,
  Senai,
} from "@/app/components/icons";
import type { Project } from "@/data/projects";
import styles from "./styles.module.css";

export interface ProjectItem {
  project: Project;
  node: ReactNode;
}

const typeIcons: Record<string, ReactNode> = {
  personal: <User className="brandIconStroke" />,
  professional: <Briefcase className="brandIconStroke" />,
  academic: <GraduationCap className="brandIconStroke" />,
};

const bondIcons: Record<string, ReactNode> = {
  Geodatin: <Geodatin className="brandIconFill" />,
  Golfarma: <Golfarma className="brandIconFill" />,
  UEFS: <UEFS className="brandIconFill" />,
  Unifacs: <Unifacs className="brandIconFill" />,
  Senai: <Senai className="brandIconFill" />,
};

interface FilterOption {
  value: string;
  label: string;
  icon?: ReactNode;
}

interface FilterDropdownProps {
  label: string;
  options: FilterOption[];
  selected: Set<string>;
  onToggle: (value: string) => void;
  onClear: () => void;
  clearLabel: string;
}

function FilterDropdown({
  label,
  options,
  selected,
  onToggle,
  onClear,
  clearLabel,
}: FilterDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") setIsOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen]);

  const count = selected.size;

  return (
    <div className={styles.dropdownContainer} ref={containerRef}>
      <button
        type="button"
        className={`${styles.trigger} ${count > 0 ? styles.triggerActive : ""}`}
        onClick={() => setIsOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <Typography variant="body2" as="span">
          {label}
        </Typography>
        {count > 0 && <span className={styles.count}>{count}</span>}
        <ChevronDown
          className={`${styles.chevron} ${isOpen ? styles.chevronOpen : ""}`}
        />
      </button>

      {isOpen && (
        <div className={styles.dropdown} role="listbox" aria-multiselectable>
          {count > 0 && (
            <button
              type="button"
              className={styles.clearButton}
              onClick={onClear}
            >
              <X />
              <Typography variant="caption1" as="span">
                {clearLabel}
              </Typography>
            </button>
          )}
          <div className={styles.optionsList}>
            {options.map((option) => {
              const isSelected = selected.has(option.value);
              return (
                <button
                  key={option.value}
                  type="button"
                  className={`${styles.option} ${isSelected ? styles.optionActive : ""}`}
                  onClick={() => onToggle(option.value)}
                  role="option"
                  aria-selected={isSelected}
                >
                  <span className={styles.optionLabel}>
                    {option.icon && (
                      <span className={styles.optionIcon} aria-hidden="true">
                        {option.icon}
                      </span>
                    )}
                    {option.label}
                  </span>
                  {isSelected && (
                    <span className={styles.checkmark} aria-hidden="true">
                      ✓
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

interface ProjectsFiltersProps {
  items: ProjectItem[];
  typeLabels: Record<string, string>;
}

function uniqueSorted<T>(values: T[], compare?: (a: T, b: T) => number): T[] {
  return Array.from(new Set(values)).sort(compare);
}

export default function ProjectsFilters({
  items,
  typeLabels,
}: ProjectsFiltersProps) {
  const t = useTranslations("projects.filters");

  const [selectedTypes, setSelectedTypes] = useState<Set<string>>(new Set());
  const [selectedBonds, setSelectedBonds] = useState<Set<string>>(new Set());

  const typeOptions = useMemo<FilterOption[]>(
    () =>
      uniqueSorted(items.map((i) => i.project.type)).map((value) => ({
        value,
        label: typeLabels[value] ?? value,
        icon: typeIcons[value],
      })),
    [items, typeLabels],
  );

  const bondOptions = useMemo<FilterOption[]>(
    () =>
      uniqueSorted(
        items
          .map((i) => i.project.bond)
          .filter((b): b is string => Boolean(b)),
      ).map((value) => ({
        value,
        label: value,
        icon: bondIcons[value] ?? <Briefcase className="brandIconStroke" />,
      })),
    [items],
  );

  const filteredItems = useMemo(() => {
    return items.filter(({ project }) => {
      if (selectedTypes.size > 0 && !selectedTypes.has(project.type))
        return false;
      if (selectedBonds.size > 0) {
        if (!project.bond || !selectedBonds.has(project.bond)) return false;
      }
      return true;
    });
  }, [items, selectedTypes, selectedBonds]);

  const totalSelected = selectedTypes.size + selectedBonds.size;

  function makeToggle(setter: React.Dispatch<React.SetStateAction<Set<string>>>) {
    return (value: string) => {
      setter((prev) => {
        const next = new Set(prev);
        if (next.has(value)) next.delete(value);
        else next.add(value);
        return next;
      });
    };
  }

  function clearAll() {
    setSelectedTypes(new Set());
    setSelectedBonds(new Set());
  }

  const clearLabel = t("clear.label");

  return (
    <>
      <div className={styles.filtersBar}>
        <FilterDropdown
          label={t("type.label")}
          options={typeOptions}
          selected={selectedTypes}
          onToggle={makeToggle(setSelectedTypes)}
          onClear={() => setSelectedTypes(new Set())}
          clearLabel={clearLabel}
        />
        <FilterDropdown
          label={t("bond.label")}
          options={bondOptions}
          selected={selectedBonds}
          onToggle={makeToggle(setSelectedBonds)}
          onClear={() => setSelectedBonds(new Set())}
          clearLabel={clearLabel}
        />
        {totalSelected > 0 && (
          <button
            type="button"
            className={styles.clearAllButton}
            onClick={clearAll}
          >
            <X />
            <Typography variant="caption1" as="span">
              {t("clearAll.label")}
            </Typography>
          </button>
        )}
      </div>

      <div className={styles.list}>
        {filteredItems.length === 0 ? (
          <Typography variant="body2" className={styles.empty}>
            {t("empty.label")}
          </Typography>
        ) : (
          filteredItems.map(({ project, node }) => (
            <div key={project.title}>{node}</div>
          ))
        )}
      </div>
    </>
  );
}
