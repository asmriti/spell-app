import { Box, Button, Modal } from "@mui/material";
import type { Spell, SpellDetail } from "../../lib/types/spell";
import {
  BookOpen,
  Clock,
  Target,
  Timer,
  Users,
  XIcon,
  Zap,
} from "lucide-react";
import { useEffect, useState } from "react";
import { fetchSpellDetail } from "../../services/api";
import { LoadingSpinner } from "./loading";

interface SpellDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  spell: Spell | null;
}

export const SpellDetailModal = (props: SpellDetailsModalProps) => {
  const { isOpen, onClose, spell } = props;

  const [spellDetail, setSpellDetail] = useState<SpellDetail | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadSpellDetail = async () => {
    if (!spell) return;
    try {
      setLoading(true);
      setError(null);
      const detail = await fetchSpellDetail(spell.index);
      setSpellDetail(detail);
    } catch (err) {
      setError("Failed to load spell details");
      console.error("Error loading spell detail:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen && spell) {
      loadSpellDetail();
    }
  }, [isOpen, spell]);

  const getLevelDisplay = (level: number) => {
    if (level === 0) return "Cantrip";
    const suffix =
      level === 1 ? "st" : level === 2 ? "nd" : level === 3 ? "rd" : "th";
    return `${level}${suffix} Level`;
  };

  if (!spell) return null;

  const modalStyle = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 700,
    bgcolor: "background.paper",
    boxShadow: 24,
    borderRadius: "8px",
    p: 4,
  };

  if (loading) {
    return (
      <Modal open={isOpen} onClose={onClose}>
        <Box sx={modalStyle}>
          <div className="flex items-center justify-center py-8">
            <LoadingSpinner />
            <div className="ml-2 text-muted-foreground">
              Loading spell details...
            </div>
          </div>
        </Box>
      </Modal>
    );
  }

  return (
    <Modal open={isOpen} onClose={onClose}>
      {spell && (
        <Box sx={modalStyle}>
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-balance">{spell.name}</h3>
            <Button onClick={onClose} color="primary">
              <XIcon className="text-black" />
            </Button>
          </div>

          {spellDetail && (
            <div className="space-y-6 max-h-[70vh] overflow-y-auto">
              <div className="flex flex-wrap gap-2">
                <div className="text-sm bg-primary/10 text-primary border border-primary/30 px-2 py-0.5 rounded-md">
                  {getLevelDisplay(spellDetail.level)}
                </div>
                {spellDetail.ritual && (
                  <div className="text-sm bg-secondary/10 border px-2 py-0.5 rounded-md border-secondary/30">
                    Ritual
                  </div>
                )}
                {spellDetail.concentration && (
                  <div className="bg-accent/10 text-accent-foreground border-accent/30">
                    Concentration
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-primary" />
                    <span className="text-sm font-medium">Casting Time:</span>
                    <span className="text-sm text-muted-foreground">
                      {spellDetail.casting_time}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Target className="h-4 w-4 text-primary" />
                    <span className="text-sm font-medium">Range:</span>
                    <span className="text-sm text-muted-foreground">
                      {spellDetail.range}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Zap className="h-4 w-4 text-primary" />
                    <span className="text-sm font-medium">Components:</span>
                    <span className="text-sm text-muted-foreground">
                      {spellDetail.components.join(", ")}
                    </span>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Timer className="h-4 w-4 text-primary" />
                    <span className="text-sm font-medium">Duration:</span>
                    <span className="text-sm text-muted-foreground">
                      {spellDetail.duration}
                    </span>
                  </div>
                  {spellDetail.attack_type && (
                    <div className="flex items-center gap-2">
                      <Target className="h-4 w-4 text-primary" />
                      <span className="text-sm font-medium">Attack Type:</span>
                      <span className="text-sm text-muted-foreground">
                        {spellDetail.attack_type}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {spellDetail.material && (
                <div>
                  <h4 className="font-medium mb-2 flex items-center gap-2">
                    <BookOpen className="h-4 w-4 text-primary" />
                    Material Components
                  </h4>
                  <p className="text-sm text-muted-foreground bg-muted/50 p-3 rounded-md">
                    {spellDetail.material}
                  </p>
                </div>
              )}

              {/* <Separator /> */}

              <div>
                <h4 className="font-medium mb-3">Description</h4>
                <div className="space-y-3">
                  {spellDetail.desc.map((paragraph, index) => (
                    <p
                      key={index}
                      className="text-sm text-muted-foreground leading-relaxed"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>

              {spellDetail.higher_level &&
                spellDetail.higher_level.length > 0 && (
                  <div>
                    <h4 className="font-medium mb-3">At Higher Levels</h4>
                    <div className="space-y-2">
                      {spellDetail.higher_level.map((paragraph, index) => (
                        <p
                          key={index}
                          className="text-sm text-muted-foreground leading-relaxed bg-muted/50 p-3 rounded-md"
                        >
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  </div>
                )}

              {/* Classes */}
              {spellDetail.classes.length > 0 && (
                <div>
                  <h4 className="font-medium mb-2 flex items-center gap-2">
                    <Users className="h-4 w-4 text-primary" />
                    Available to Classes
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {spellDetail.classes.map((cls) => (
                      <div
                        key={cls.index}
                        className="text-xs border-transparent text-muted bg-primary/70 px-2 py-0.5 rounded-md"
                      >
                        {cls.name}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </Box>
      )}
    </Modal>
  );
};
